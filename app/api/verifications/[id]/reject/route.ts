import { db } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

type Params = { params: { id: string } };

export async function POST(request: NextRequest, { params }: Params) {
  const { id } = params;
  const body = await request.json();
  const { reason } = body;

  if (!reason || reason.trim() === "") {
    return NextResponse.json(
      { message: "Rejection reason is required." },
      { status: 400 },
    );
  }

  try {
    const updated = await db.verification.update({
      where: { id },
      data: {
        status: "Rejected",
        reviewedAt: new Date(),
        reviewedBy: "admin", // Replace with real reviewer ID/email
        rejectionReason: reason,
      },
    });

    await db.user.update({
      where: { id: updated.userId },
      data: {
        verificationStatus: "Not verified",
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error rejecting verification:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
