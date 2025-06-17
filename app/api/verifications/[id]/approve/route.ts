import { db } from "@/app/lib/db";
import { type NextRequest, NextResponse } from "next/server";
import { sendEmail } from "../emailAction";

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;

  try {
    const updated = await db.verification.update({
      where: { id },
      data: {
        status: "Verified",
        reviewedAt: new Date(),
        reviewedBy: "admin", // Ideally, fetch actual user from auth
        rejectionReason: null,
      },
    });

    const user = await db.user.update({
      where: { id: updated.userId },
      data: {
        verified: true,
        verificationStatus: "Verified",
      },
    });

    const subject = "Your documents have been successfully verified!";

    await sendEmail(user.email, subject, user.username, "Approved");

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error approving verification:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
