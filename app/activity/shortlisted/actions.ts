"use server";

import { getUser } from "@/app/lib/actions";
import { db } from "@/app/lib/db";

export const getShortlistedLeads = async (email: string) => {
  const user = await getUser(email);

  const shortlists = await db.shortlist.findMany({
    where: {
      userId: user?.id,
    },
  });

  return shortlists;
};
