import { db } from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const verifications = await db.verification.findMany({
      include: {
        user: true,
      },
    });

    const records = verifications.map((v) => ({
      id: v.id,
      userId: v.userId.toString(),
      userName: v.user.username,
      userEmail: v.user.email,
      documentType: v.documentType || "",
      status: v.status.toLowerCase() as
        | "submitted"
        | "pending"
        | "verified"
        | "rejected",
      submittedAt: v.createdAt.toISOString(),
      reviewedAt: v.reviewedAt?.toISOString(),
      reviewedBy: v.reviewedBy || undefined,
      files: {
        front: v.url,
        back: v.url || undefined,
      },
    }));

    return NextResponse.json(records);
  } catch (error) {
    console.error("Error fetching verifications:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
