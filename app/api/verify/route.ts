import { getUser } from "@/app/lib/actions";
import { auth } from "@/app/lib/auth";
import { db } from "@/app/lib/db";
import { put } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";
import * as Brevo from "@getbrevo/brevo";
import { format } from "date-fns";

export async function POST(request: NextRequest) {
  const session = await auth();

  try {
    const user = await getUser(session?.user?.email as string);
    const formData = await request.formData();
    const files = formData.getAll("files") as File[];
    const docType = formData.get("documentType");

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

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
          userId: user.id,
          status: "Pending",
          documentType: documentType,
        },
      });

      await db.user.update({
        where: { id: user.id },
        data: {
          verificationStatus: "Pending",
        },
      });

      await notifyAdmin(user.username, user.email, documentType);

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

const notifyAdmin = async (
  userName: string,
  userEmail: string,
  documentType: string,
) => {
  const apiInstance = new Brevo.TransactionalEmailsApi();
  apiInstance.setApiKey(
    Brevo.TransactionalEmailsApiApiKeys.apiKey,
    process.env.BREVO_API_KEY || "",
  );

  const htmlContent = `
  <html>
    <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; margin: 0; padding: 0;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9f9f9; padding: 20px 0;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.1);">
              <tr>
                <td style="padding: 30px; text-align: center; border-bottom: 1px solid #eeeeee;">
                  <h1 style="color: #333333; margin: 0;">New Verification Submission</h1>
                </td>
              </tr>
              <tr>
                <td style="padding: 30px; color: #555555; font-size: 16px; line-height: 1.6;">
                  <p>Hi <strong>Admin</strong>,</p>
                  <p><strong>${userName}</strong> (<a href="mailto:${userEmail}">${userEmail}</a>) has just submitted their identity verification documents for review.</p>
                  <p>Please review and approve or reject the submitted documents in the admin dashboard.</p>
                  <p><strong>Document Type:</strong> ${documentType}</p>
                  <p><strong>Submission Time:</strong> ${format(new Date(), "dd-MM-yyyy")}</p>
                  <p>You can access the admin panel below to manage this verification request.</p>
                  <p>
                    <a href="https://getatradelinkltd.com/login" style="display:inline-block; margin-top: 20px; padding: 10px 20px; background-color: #1a73e8; color: #ffffff; text-decoration: none; border-radius: 4px;">
                      Review Documents
                    </a>
                  </p>
                  <p style="margin-top: 30px;">Best regards,<br><strong>Getatrade Link Ltd System</strong></p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>
`;

  const sendSmtpEmail = {
    to: [{ email: "info@getatradelinkltd.com" }],
    subject: "USER VERIFICATION",
    htmlContent: htmlContent,
    sender: { email: "info@getatradelinkltd.com", name: "Getatrade" },
  };

  try {
    await apiInstance.sendTransacEmail(sendSmtpEmail);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};
