import { db } from "@/app/lib/db";
import { authenticateUser } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const user = await authenticateUser(request);

    if (user instanceof NextResponse) {
      return user;
    }

    const jobs = await db.job.findMany({
      where: {
        closedAt: null,
        userId: user.userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(jobs);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
