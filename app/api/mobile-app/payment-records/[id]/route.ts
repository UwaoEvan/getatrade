import { db } from "@/app/lib/db";
import { authenticateUser } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const user = await authenticateUser(request);
    const { paymentId } = await request.json();

    if (user instanceof NextResponse) {
      return user;
    }

    const { id } = await params;

    await db.$transaction(async (trx) => {
      const existingJob = await trx.shortlist.update({
        where: { id },
        data: {
          paid: true,
        },
      });

      await trx.interest.deleteMany({
        where: {
          userId: user.userId,
          jobId: existingJob.jobId,
        },
      });

      await trx.payments.update({
        where: { id: paymentId },
        data: {
          status: "PAID",
        },
      });
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: `Something went wrong: ${error} ` },
      { status: 500 },
    );
  }
}
