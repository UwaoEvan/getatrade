import { db } from "@/app/lib/db";
import { authenticateUser } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const user = await authenticateUser(request);

    if (user instanceof NextResponse) {
      return user;
    }

    type Lead = {
      id: string;
      title: string;
      description: string;
      category: string;
      project: string;
      createdAt: Date;
      location: string;
      userId: number;
      interested: number;
      shortlisted: number;
      closedAt: Date;
      active: boolean;
      jobId: string;
      paid: boolean;
    };

    const closed = await db.$queryRaw<Lead[]>`
    SELECT * 
    FROM "job"
    INNER JOIN "shortlist" ON "shortlist"."jobId" = "job"."id"
    WHERE "shortlist"."userId" = ${user.userId} AND "job"."active" = false
  `;

    return NextResponse.json(closed);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
