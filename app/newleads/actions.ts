"use server";

import { getJobPosting, getUser, State } from "@/app/lib/actions";
import { db } from "@/app/lib/db";
import { sendEmail } from "@/app/lib/emailTemplate";
import { showInterestSchema } from "@/app/lib/schemas";

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

    if (user.role === "customer") {
      return { error: "Customer aren't allowed to show interest." };
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
