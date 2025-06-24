"use server";

import { db } from "@/app/lib/db";

export const fetchAllJobs = async () => {
  const jobs = await db.job.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return jobs;
};

export const closeJob = async (jobId: string) => {
  if (jobId) {
    await db.job.update({
      where: { id: jobId },
      data: {
        closedAt: new Date(),
        active: false,
      },
    });
    return true;
  }
};
