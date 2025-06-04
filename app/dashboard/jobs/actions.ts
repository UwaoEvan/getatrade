"use server";

import { db } from "@/app/lib/db";

export const fetchAllJobs = async () => {
  const jobs = await db.job.findMany();
  return jobs;
};
