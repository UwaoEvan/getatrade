import { db } from "@/app/lib/db";
import { authenticateUser } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const user = await authenticateUser(request);

    if (user instanceof NextResponse) {
      return user;
    }

    const interested = await db.interest.findMany({
      where: { userId: user.userId },
      include: {
        job: true,
      },
    });

    return NextResponse.json(interested);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
