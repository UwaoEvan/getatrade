"use server";

import { getJobPosting, getUser, State } from "../lib/actions";
import { db } from "../lib/db";
import { sendEmail } from "../lib/emailTemplate";
import { closeJobSchema, shortlist } from "../lib/schemas";

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

    await db.interest.deleteMany({
      where: {
        jobId,
        userId: parseInt(userId),
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

export const getShortlists = async (jobId: string) => {
  const shortlist = await db.shortlist.findMany({
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

export const closeJob = async (prevState: State, formData: FormData) => {
  const parsed = closeJobSchema.safeParse({
    jobId: formData.get("jobId"),
  });

  if (!parsed.success) {
    return { error: "Invalid job id" };
  }

  const { jobId } = parsed.data;

  await db.job.update({
    where: {
      id: jobId,
    },
    data: {
      closedAt: new Date(),
      active: false,
    },
  });

  await db.closed.create({
    data: {
      jobId,
    },
  });

  return { success: true };
};
