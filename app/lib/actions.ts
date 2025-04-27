"use server";

import { signIn } from "./auth";
import { AuthError } from "next-auth";
import { postJobSchema, registerSchema, showInterestSchema } from "./schemas";
import bcrypt from "bcrypt";
import { db } from "./db";
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

  await db.user.create({
    data: {
      email,
      username,
      hashedPassword,
      role,
    },
  });

  return { success: true };
};

export const postJob = async (prevState: State, formData: FormData) => {
  const parsed = postJobSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    location: formData.get("location"),
    category: formData.get("category"),
    contactEmail: formData.get("contactEmail"),
    project: formData.get("project"),
  });

  if (!parsed.success) {
    return { error: "Invalid form data" };
  }

  const { category, contactEmail, title, description, location, project } =
    parsed.data;

  await db.job.create({
    data: {
      title,
      description,
      category,
      contactEmail,
      createdAt: new Date(),
      location,
      project,
    },
  });

  return { success: true };
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

export const getUser = async (email: string) => {
  const user = await db.user.findFirst({
    where: { email: email as string },
  });
  return user;
};

export const getInterestedLeads = async (email: string) => {
  const user = await getUser(email);

  const showInterests = await db.interest.findMany({
    where: {
      userId: user?.id,
    },
  });

  if (!showInterests) {
    return [];
  }

  return showInterests;
};

export const getInterestedLead = async (jobId: string) => {
  const lead = await db.interest.findFirst({
    where: {
      jobId,
    },
  });
  return lead;
};

export const showInterest = async (prevState: State, formData: FormData) => {
  try {
    const parsed = showInterestSchema.safeParse({
      proposal: formData.get("proposal"),
      jobId: formData.get("jobId"),
      email: formData.get("email"),
    });

    if (!parsed.success) {
      return { error: "Invalid formdata" };
    }

    const { proposal, jobId, email } = parsed.data;

    const user = await getUser(email);

    if (!user) {
      return { error: "user not found." };
    }

    const interest = await getInterestedLead(jobId);

    if (interest) {
      return { error: "You have already applied for this job." };
    }

    await db.interest.create({
      data: {
        proposal: proposal as string,
        userId: user.id,
        jobId: jobId as string,
        createdAt: new Date(),
      },
    });

    return { success: true };
  } catch (error) {
    return { error: JSON.stringify(error) };
  }
};
