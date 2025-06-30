import { db } from "@/app/lib/db";
import { authenticateUser } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await authenticateUser(request);

    const newLeads = await db.job.findMany({
      where: {
        closedAt: null,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(newLeads);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
