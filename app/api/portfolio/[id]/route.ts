import { db } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const images = await db.portfolioImage.findMany({
      where: {
        userId: parseInt(id),
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ images });
  } catch (error) {
    console.error("Fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch images" },
      { status: 500 },
    );
  }
}