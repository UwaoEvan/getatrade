"use server";

import { getUser } from "@/app/lib/actions";
import { db } from "@/app/lib/db";

export const getShortlistedLeads = async (email: string) => {
  const user = await getUser(email);
  type Lead = {
    id: string;
    title: string;
    description: string;
    category: string;
    project: string;
    createdAt: Date;
    location: string;
    userId: number;
    interested: number;
    shortlisted: number;
    closedAt: Date;
    active: boolean;
    jobId: string;
    paid: boolean;
    username: string;
    jobPosterId: number;
  };
  const shortlist = await db.$queryRaw<Lead[]>`
    SELECT *, "job"."userId" as "jobPosterId"
    FROM "job"
    INNER JOIN "shortlist" ON "shortlist"."jobId" = "job"."id"
    INNER JOIN "user" ON "user"."id" = "job"."userId"
    WHERE "shortlist"."userId" = ${user?.id} AND "job"."active" = true AND "shortlist"."paid" = true
  `;
  return shortlist;
};
