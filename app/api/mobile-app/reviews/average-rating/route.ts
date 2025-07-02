import { db } from "@/app/lib/db";
import { authenticateUser } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const user = await authenticateUser(request);

    if (user instanceof NextResponse) {
      return user;
    }

    const avgRating = await db.reviews.aggregate({
      _avg: {
        rating: true,
      },
      where: {
        tradesPersonId: user.userId,
      },
    });
    return NextResponse.json(avgRating._avg.rating);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
