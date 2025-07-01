import { db } from "@/app/lib/db";
import { authenticateUser } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const user = await authenticateUser(request);

    if (user instanceof NextResponse) {
      return user;
    }

    const shortlisted = await db.shortlist.findMany({
      where: { userId: user.userId },
      include: {
        job: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const activeJobs = shortlisted.filter(job => job?.job?.active);

    return NextResponse.json(activeJobs);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
