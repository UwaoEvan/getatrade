"use server";

import { getJobPosting, getUser, State } from "../lib/actions";
import { auth } from "../lib/auth";
import { db } from "../lib/db";
import { sendEmail } from "../lib/emailTemplate";
import { closeJobSchema, reviewsSchema, shortlist } from "../lib/schemas";

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
      user: true
    }
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
  type Shortlist = {
    shortlistId: string;
    username: string;
    location: string;
    userId: number;
  };

  const shortlists = await db.$queryRaw<Shortlist[]>`
    SELECT "shortlist"."id" AS "shortlistId", "user"."username", "user"."location", "user"."id" AS "userId"
    FROM "shortlist"
    INNER JOIN "user"
    ON "user"."id" = "shortlist"."userId"
    WHERE "shortlist"."jobId" = ${jobId}
  `;
  return shortlists;
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

export const submitReview = async (prevState: State, formData: FormData) => {
  const session = await auth();
  const user = await getUser(session?.user?.email as string);

  const parsed = reviewsSchema.safeParse({
    tradespersonId: formData.get("userId"),
    rating: formData.get("rating"),
    review: formData.get("review"),
    jobId: formData.get("jobId"),
  });

  if (!parsed.success) {
    return { error: "Invalid data" };
  }

  if (!user) {
    return { error: "User not found" };
  }

  const { tradespersonId, rating, review, jobId } = parsed.data;
  await db.reviews.create({
    data: {
      customerId: user.id,
      tradesPersonId: parseInt(tradespersonId),
      rating: parseFloat(rating),
      review,
      jobId,
    },
  });
  return { success: true };
};
