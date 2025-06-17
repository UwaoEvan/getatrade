import { db } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

type Params = { params: { id: string } };

export async function POST(_: NextRequest, { params }: Params) {
  const { id } = params;

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

    await db.user.update({
      where: { id: updated.userId },
      data: {
        verified: true,
        verificationStatus: "Verified",
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error approving verification:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
