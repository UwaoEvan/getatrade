"use server";

import { getUser, State } from "../lib/actions";
import * as Brevo from "@getbrevo/brevo";
import { newPasswordSchema } from "../lib/schemas";
import { db } from "../lib/db";
import bcrypt from "bcrypt";

export const setNewPassword = async (prevState: State, formData: FormData) => {
  const parsed = newPasswordSchema.safeParse({
    newPassword: formData.get("newPassword"),
    password: formData.get("password"),
    userId: formData.get("userId"),
  });

  if (!parsed.success) {
    const firstError = parsed.error.errors[0]?.message || "Invalid form data";
    return { error: firstError };
  }

  const { newPassword, password, userId } = parsed.data;
  if (newPassword !== password) {
    return {
      error: "Passwords don't match!!",
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.update({
    where: {
      id: parseInt(userId),
    },
    data: {
      hashedPassword,
    },
  });

  return {
    success: true,
  };
};

export const resetPassword = async (prevState: State, formData: FormData) => {
  const email = formData.get("email");
  const user = await getUser(email as string);

  if (!user) {
    return {
      error: "User doesn't exist.",
    };
  }
  await sendEmail(user.username, user.email, user.id);
  return { success: true };
};

export const sendEmail = async (
  userName: string,
  to: string,
  userId: number,
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
                <td style="padding: 30px; color: #555555; font-size: 16px; line-height: 1.5;">
                    <p>Hi <strong>${userName}</strong>,</p>
                    <p>You can now reset your password using the below link.</p>
                    <table cellpadding="0" cellspacing="0" style="margin: 20px 0;">
                      <tr>
                        <td align="center">
                          <a href="https://getatradelinkltd.com/forgot-password/${userId} style="background-color: #007BFF; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
                            Reset password
                          </a>
                        </td>
                      </tr>
                    </table>
                    <p>If you have any questions, feel free to reply to this email or contact our support team.</p>
                    <p>Thank you for using <strong>Getatradelinkltd</strong>!</p>
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
    to: [{ email: to }],
    subject: "PASSWORD RESET",
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
