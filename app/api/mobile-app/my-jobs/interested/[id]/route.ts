import { db } from "@/app/lib/db";
import { authenticateUser } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const user = await authenticateUser(request);

    if (user instanceof NextResponse) {
      return user;
    }

    const interested = await db.interest.findMany({
      where: {
        jobId: id,
      },
      include: {
        // job: true,
        user: true,
      },
    });

    return NextResponse.json(interested);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
