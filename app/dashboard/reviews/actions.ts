"use server";

import { db } from "@/app/lib/db";

export const getAllReviews = async () => {
  const reviews = await db.reviews.findMany();
  return reviews;
};
