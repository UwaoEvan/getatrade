"use server";

import { getUser } from "@/app/lib/actions";
import { auth } from "@/app/lib/auth";
import { db } from "@/app/lib/db";

export const getReviews = async () => {
  const session = await auth();
  const user = await getUser(session?.user?.email as string);

  type Review = {
    username: string;
    title: string;
    rating: number;
    review: string;
    createdAt: Date;
  };

  if (user) {
    const reviews = await db.$queryRaw<Review[]>`
      SELECT "user"."username", "job"."title", "reviews"."rating", "reviews"."review", "reviews"."createdAt"
      FROM "reviews"
      INNER JOIN "job"
      ON "job"."id" = "reviews"."jobId"
      INNER JOIN "user" 
      ON "user"."id" = "job"."userId"
    `;
    return reviews;
  }
};
