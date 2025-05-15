"use server";

import { db } from "@/app/lib/db";

export const getShortListedInfo = async (jobId: string) => {
  const interest = await db.shortlist.findFirst({
    where: {
      jobId,
    },
  });
  return interest;
};
