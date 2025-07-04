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

    const job = await db.shortlist.update({
      where: { id },
      data: {
        paid: true,
      },
    });

    if (!job) {
      return NextResponse.json(
        { error: `Job with the id of ${id} not found.` },
        { status: 404 },
      );
    }

    await db.payments.update({
      where: { id: paymentId },
      data: {
        status: "PAID",
      },
    });

    return NextResponse.json(job);
  } catch (error) {
    return NextResponse.json(
      { error: `Something went wrong: ${error} ` },
      { status: 500 },
    );
  }
}
