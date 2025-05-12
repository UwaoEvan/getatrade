"use server";

import { signIn } from "./auth";
import { AuthError } from "next-auth";
import {
  postJobSchema,
  registerSchema,
  shortlist,
  showInterestSchema,
} from "./schemas";
import bcrypt from "bcrypt";
import { db } from "./db";
import { sendEmail } from "./emailTemplate";
import { redirect } from "next/navigation";

type State = {
  error?: string;
  success?: boolean;
};

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return error.message;
    }
    return "Unknown error occurred";
  }
  redirect("/newleads");
}

export const register = async (prevState: State, formData: FormData) => {
  const parsed = registerSchema.safeParse({
    email: formData.get("email"),
    username: formData.get("username"),
    role: formData.get("role"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: "Invalid form data" };
  }

  const { email, username, password, role } = parsed.data;

  const existingUser = await db.user.findUnique({ where: { email } });

  if (existingUser) {
    return { error: "Email already in use" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await db.user.create({
    data: {
      email,
      username,
      hashedPassword,
      role,
    },
  });

  await signIn("credentials", {
    email: formData.get("email"),
    password: formData.get("password"),
    redirect: false,
  });

  return { success: true, userId: user.id };
};

export const postJob = async (prevState: State, formData: FormData) => {
  const user = await register(prevState, formData);
  if (user.success) {
    const parsed = postJobSchema.safeParse({
      title: formData.get("title"),
      description: formData.get("description"),
      location: formData.get("location"),
      category: formData.get("category"),
      project: formData.get("project"),
    });

    if (!parsed.success) {
      const firstError = parsed.error.errors[0]?.message || "Invalid form data";
      return { error: firstError };
    }

    const { category, title, description, location, project } = parsed.data;

    await db.job.create({
      data: {
        title,
        description,
        category,
        createdAt: new Date(),
        location,
        project,
        userId: user.userId,
      },
    });

    return { success: true };
  }
  return { error: "Something went wrong" };
};

export const getJobPostings = async () => {
  const jobs = await db.job.findMany();
  return jobs;
};

export const getJobPosting = async (id: string) => {
  const job = await db.job.findFirst({
    where: {
      id,
    },
  });
  return job;
};

export const getUser = async (email?: string, id?: number) => {
  if (email) {
    const user = await db.user.findFirst({
      where: { email: email as string },
    });
    return user;
  } else {
    const user = await db.user.findFirst({
      where: { id },
    });
    return user;
  }
};

export const getInterestedLeads = async (email: string) => {
  const user = await getUser(email);

  const showInterests = await db.interest.findMany({
    where: {
      userId: user?.id,
    },
    include: {
      user: true,
    },
  });

  if (!showInterests) {
    return [];
  }

  return showInterests;
};

export const getInterestedLead = async (jobId: string, userId: number) => {
  const lead = await db.interest.findFirst({
    where: {
      jobId,
      userId,
    },
    include: {
      user: true,
    },
  });
  return lead;
};

export const showInterest = async (prevState: State, formData: FormData) => {
  try {
    const parsed = showInterestSchema.safeParse({
      jobId: formData.get("jobId"),
      email: formData.get("email"),
    });

    if (!parsed.success) {
      return { error: "Invalid formdata" };
    }

    const { jobId, email } = parsed.data;

    const user = await getUser(email);

    const job = await getJobPosting(jobId);

    const jobCreator = await db.user.findFirst({
      where: { id: job?.userId },
    });

    if (!user) {
      return { error: "user not found." };
    }

    if (!job) {
      return { error: "Job not found." };
    }

    const interest = await getInterestedLead(jobId, user.id);

    if (interest) {
      return { error: "You have already applied for this job." };
    }

    await db.interest.create({
      data: {
        userId: user.id,
        jobId: jobId as string,
        createdAt: new Date(),
      },
    });

    await db.job.update({
      where: { id: jobId },
      data: {
        interested: (job.interested ?? 0) + 1,
        shortlisted: job.shortlisted,
      },
    });
    await sendEmail(
      jobCreator?.email as string,
      "Tradesperson Interested in the job",
      job.title,
      jobCreator?.username as string,
      "tradesperson",
    );

    return { success: true };
  } catch (error) {
    return { error: JSON.stringify(error) };
  }
};

export const getCustomerJobs = async (email: string) => {
  const user = await getUser(email);
  const jobs = await db.job.findMany({
    where: {
      userId: user?.id,
    },
  });
  return jobs;
};

export const getInterestOnJob = async (jobId: string) => {
  const interest = await db.interest.findMany({
    where: {
      jobId,
    },
    include: {
      user: true,
    },
  });
  return interest;
};

export const getShortlists = async (jobId: string) => {
  const shortlist = await db.interest.findMany({
    where: {
      jobId,
    },
    include: {
      user: true,
    },
  });
  return shortlist;
};

export const getShortlistedOnJob = async (jobId: string, userId: number) => {
  const interest = await db.shortlist.findFirst({
    where: {
      jobId,
      userId,
    },
  });
  return interest;
};

export const shortlistTradesperson = async (
  prevState: State,
  formData: FormData,
) => {
  try {
    const parsed = shortlist.safeParse({
      jobId: formData.get("jobId"),
      userId: formData.get("userId"),
    });

    if (!parsed.success) {
      return { error: "Invalid formdata" };
    }

    const { jobId, userId } = parsed.data;

    const job = await getJobPosting(jobId);

    const tradesPerson = await db.user.findFirst({
      where: { id: parseInt(userId) },
    });

    if (!tradesPerson) {
      return { error: "user not found." };
    }

    if (!job) {
      return { error: "Job not found." };
    }

    const interest = await getShortlistedOnJob(jobId, parseInt(userId));

    if (interest) {
      return { error: "You have already shortlisted for this person." };
    }

    await db.shortlist.create({
      data: {
        userId: parseInt(userId),
        jobId: jobId as string,
        createdAt: new Date(),
      },
    });

    await db.job.update({
      where: { id: jobId },
      data: {
        interested: (job.interested ?? 0) - 1,
        shortlisted: (job.shortlisted ?? 0) + 1,
      },
    });

    await sendEmail(
      tradesPerson?.email as string,
      "You have been shortlisted.",
      job.title,
      tradesPerson?.username as string,
      "customer",
    );

    return { success: true };
  } catch (error) {
    return { error: JSON.stringify(error) };
  }
};
