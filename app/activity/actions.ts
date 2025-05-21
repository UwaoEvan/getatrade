"use server";

import { getUser } from "../lib/actions";
import { db } from "../lib/db";

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

export const getClosedLeads = async (email: string) => {
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
  };

  const closed = await db.$queryRaw<Lead[]>`
    SELECT * 
    FROM "job"
    INNER JOIN "shortlist" ON "shortlist"."jobId" = "job"."id"
    WHERE "shortlist"."userId" = ${user?.id} AND "job"."active" = false
  `;

  return closed;
};
