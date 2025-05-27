"use server";

import { getUser } from "@/app/lib/actions";
import { auth } from "@/app/lib/auth";
import { db } from "@/app/lib/db";

export const getHiredJobs = async () => {
  const session = await auth();
  const user = await getUser(session?.user?.email as string);

  const jobs = await db.shortlist.findMany({
    where: {
      userId: user?.id,
      paid: true,
    },
    include: {
      job: true,
    },
  });

  return jobs;
};
