"use server";

import { db } from "@/app/lib/db";

export const updateLocation = async (
  location: string,
  distance: number,
  userId: number,
) => {
  await db.user.update({
    where: {
      id: userId,
    },
    data: {
      location,
      distanceArea: distance,
    },
  });
  return true;
};
