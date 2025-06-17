import { db } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  params: Promise<{ id: string }>;
};

export async function GET(request: NextRequest, { params }: Params) {
  const { id } = await params;

  if (!id || typeof id !== "string") {
    return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
  }

  try {
    const v = await db.verification.findUnique({
      where: { id },
      include: {
        user: true,
      },
    });

    if (!v) {
      return NextResponse.json(
        { message: "Verification not found" },
        { status: 404 },
      );
    }

    const record = {
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
      // reviewedAt: v.reviewedAt?.toISOString(),
      // reviewedBy: v.reviewedBy || undefined,
      files: {
        front: v.url, // make sure your model has frontUrl
        back: v.url || undefined,
      },
    };

    return NextResponse.json(record);
  } catch (error) {
    console.error("Error fetching verification:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
