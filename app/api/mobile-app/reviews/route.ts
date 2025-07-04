import { db } from "@/app/lib/db";
import { authenticateUser } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET(request: NextRequest) {
  try {
    const user = await authenticateUser(request);

    if (user instanceof NextResponse) {
      return user;
    }

    const reviews = await db.reviews.findMany({
      where: { tradesPersonId: user.userId },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(reviews);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

const reviewsSchema = z.object({
  rating: z.string({ required_error: "Rating is missing" }),
  review: z.string({ required_error: "Review is missing" }),
  jobId: z.string({ required_error: "Job is missing" }),
  jobTitle: z.string({ required_error: "Job title is missing" }),
  tradesPersonId: z.string({ required_error: "Tradesperson is required" }),
});

export async function POST(request: NextRequest) {
  try {
    const lUser = await authenticateUser(request);
    const body = await request.json();
    const parsed = reviewsSchema.parse(body);

    if (lUser instanceof NextResponse) {
      return lUser;
    }

    const user = await db.user.findFirst({
      where: { id: lUser.userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { rating, review, tradesPersonId, jobId, jobTitle } = parsed;

    const reviews = await db.reviews.create({
      data: {
        review,
        rating: parseFloat(rating),
        tradesPersonId: parseInt(tradesPersonId),
        customerId: user?.id,
        jobId,
        jobTitle: jobTitle,
        creator: user.username,
      },
    });

    return NextResponse.json(reviews);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
