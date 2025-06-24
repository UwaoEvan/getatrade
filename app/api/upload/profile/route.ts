import { db } from "@/app/lib/db";
import { put } from "@vercel/blob";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("image") as File;
    const userId = formData.get("userId") as string;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "File must be an image" },
        { status: 400 },
      );
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File size must be less than 5MB" },
        { status: 400 },
      );
    }

    if (!userId) {
      return NextResponse.json({ error: "User not found." });
    }

    const blob = await put(file.name, file, {
      access: "public",
      addRandomSuffix: true,
    });

    const profileImage = await db.user.update({
      where: { id: parseInt(userId) },
      data: {
        profileUrl: blob.url,
      },
    });

    return NextResponse.json({
      success: true,
      images: profileImage,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
