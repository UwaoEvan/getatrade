import { db } from "@/app/lib/db";
import { authenticateUser } from "@/lib/utils";
import { put } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";
import { notifyAdmin } from "../../verify/route";

export async function POST(request: NextRequest) {
  try {
    const user = await authenticateUser(request);

    const formData = await request.formData();
    const files = formData.getAll("files") as File[];
    const docType = formData.get("documentType");

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "No files provided" }, { status: 400 });
    }

    if (typeof docType !== "string") {
      return NextResponse.json(
        { error: "Invalid document type" },
        { status: 400 },
      );
    }

    const documentType = docType;

    const uploadPromises = files.map(async (file) => {
      // Upload to Vercel Blob
      const blob = await put(file.name, file, {
        access: "public",
        addRandomSuffix: true,
      });

      const verificationImage = await db.verification.create({
        data: {
          url: blob.url,
          filename: `Verification ${file.name}`,
          userId: user?.userId || 0,
          status: "Pending",
          documentType: documentType,
        },
      });

      const updatedUser = await db.user.update({
        where: { id: user?.userId },
        data: {
          verificationStatus: "Pending",
        },
      });

      await notifyAdmin(updatedUser.username, updatedUser.email, documentType);

      return verificationImage;
    });

    const uploadedImages = await Promise.all(uploadPromises);

    return NextResponse.json({
      success: true,
      images: uploadedImages,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload images" },
      { status: 500 },
    );
  }
}
