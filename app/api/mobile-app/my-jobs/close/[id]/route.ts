import { db } from "@/app/lib/db";
import { authenticateUser } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const user = await authenticateUser(request);

    if (user instanceof NextResponse) {
      return user;
    }

    await db.$transaction(async (trx) => {
      const job = await trx.job.update({
        where: { id },
        data: {
          closedAt: new Date(),
        },
      });
      await trx.closed.create({
        data: {
          jobId: job.id,
        },
      });
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
