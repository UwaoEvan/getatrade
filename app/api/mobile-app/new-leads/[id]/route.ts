import { db } from "@/app/lib/db";
import { authenticateUser } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const user = await authenticateUser(request);

    if (user instanceof NextResponse) {
      return user;
    }

    const { id } = await params;

    const job = await db.job.findFirst({
      where: { id },
    });

    if (!job) {
      return NextResponse.json(
        { error: `Job with the id of ${id} not found.` },
        { status: 404 },
      );
    }

    return NextResponse.json(job);
  } catch (error) {
    return NextResponse.json(
      { error: `Something went wrong: ${error} ` },
      { status: 500 },
    );
  }
}
