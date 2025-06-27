"use server";

import { db } from "@/app/lib/db";

export const fetchReviews = async (userId: number) => {
  const reviews = await db.reviews.findMany({
    where: {
      tradesPersonId: userId,
    },
  });
  return reviews;
};

export const getAverageRating = async (userId: number) => {
  const avgRating = await db.reviews.aggregate({
    _avg: {
      rating: true,
    },
    where: {
      tradesPersonId: userId,
    },
  });
  return avgRating;
};
