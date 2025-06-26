"use server";

import { db } from "../lib/db";

export const editProfile = async (userId: number, about: string) => {
  await db.user.update({
    where: {
      id: userId,
    },
    data: {
      about,
    },
  });
  return true;
};
