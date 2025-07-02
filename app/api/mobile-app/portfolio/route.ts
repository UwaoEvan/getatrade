import { db } from "@/app/lib/db";
import { authenticateUser } from "@/lib/utils";
import { put } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const user = await authenticateUser(request);

    if (user instanceof NextResponse) {
      return user;
    }

    const portfolioImages = await db.portfolioImage.findMany({
      where: {
        userId: user.userId,
      },
    });
    return NextResponse.json(portfolioImages);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await authenticateUser(request);

    if (user instanceof NextResponse) {
      return user;
    }

    const formData = await request.formData();
    const files = formData.getAll("files") as File[];

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "No files provided" }, { status: 400 });
    }

    const uploadPromises = files.map(async (file) => {
      // Upload to Vercel Blob
      const blob = await put(file.name, file, {
        access: "public",
        addRandomSuffix: true,
      });

      const portfolio = await db.portfolioImage.create({
        data: {
          url: blob.url,
          filename: `Verification ${file.name}`,
          userId: user.userId,
        },
      });

      return portfolio;
    });

    const uploadedImages = await Promise.all(uploadPromises);

    return NextResponse.json({
      success: true,
      images: uploadedImages,
    });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
