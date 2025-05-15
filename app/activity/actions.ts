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
