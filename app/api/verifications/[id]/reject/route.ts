import { db } from "@/app/lib/db";
import { type NextRequest, NextResponse } from "next/server";
import { sendEmail } from "../emailAction";

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
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

    const user = await db.user.update({
      where: { id: updated.userId },
      data: {
        verificationStatus: "Not verified",
      },
    });

    const subject = "Your document submission was unsuccessful - please resubmit";

    await sendEmail(
      user.email,
      subject,
      user.username,
      "Rejected",
      updated?.rejectionReason || "",
    );

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error rejecting verification:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
