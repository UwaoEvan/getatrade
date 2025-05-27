"use server";

import { getUser, State } from "@/app/lib/actions";
import { auth } from "@/app/lib/auth";
import { db } from "@/app/lib/db";
import { replyReviewSchema } from "@/app/lib/schemas";

export const getReviews = async (userId?: number) => {
  const session = await auth();
  let user;

  if (userId) {
    user = await getUser("", userId);
  } else {
    user = await getUser(session?.user?.email as string);
  }

  type Review = {
    username: string;
    title: string;
    rating: number;
    review: string;
    createdAt: Date;
    id: string;
  };

  if (user) {
    const reviews = await db.$queryRaw<Review[]>`
      SELECT "user"."username", "job"."title", "reviews"."id", "reviews"."rating", "reviews"."review", "reviews"."createdAt"
      FROM "reviews"
      INNER JOIN "job"
      ON "job"."id" = "reviews"."jobId"
      INNER JOIN "user" 
      ON "user"."id" = "job"."userId"
      WHERE "reviews"."tradesPersonId" = ${user.id}
    `;
    return reviews;
  }
};

export const replyReview = async (prevState: State, formData: FormData) => {
  const session = await auth();
  const user = await getUser(session?.user?.email as string);

  const parsed = replyReviewSchema.safeParse({
    reply: formData.get("reply"),
    reviewId: formData.get("reviewId"),
  });

  if (!parsed.success) {
    return { error: "Invalid" };
  }

  const { reply, reviewId } = parsed.data;
  if (user) {
    await db.reviews.update({
      where: {
        id: reviewId,
      },
      data: {
        reply,
        replyCreatedAt: new Date(),
      },
    });

    return { success: true };
  }

  return { error: "User  not found" };
};

export const getAverageRating = async () => {
  const session = await auth();
  const user = await getUser(session?.user?.email as string);

  if (user) {
    const avgRating = await db.reviews.aggregate({
      _avg: {
        rating: true,
      },
      where: {
        tradesPersonId: user.id,
      },
    });

    return avgRating;
  }
};
