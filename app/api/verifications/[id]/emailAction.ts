import * as Brevo from "@getbrevo/brevo";

export const sendEmail = async (
  to: string,
  subject: string,
  userName: string,
  status: string,
  reason?: string
) => {
  const apiInstance = new Brevo.TransactionalEmailsApi();
  apiInstance.setApiKey(
    Brevo.TransactionalEmailsApiApiKeys.apiKey,
    process.env.BREVO_API_KEY || "",
  );

  const htmlContent = generateHtmlContent(userName, status, reason);

  const sendSmtpEmail = {
    to: [{ email: to }],
    subject: subject,
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

const generateHtmlContent = (userName: string, status: string, reason?: string) => {
  let htmlContent;
  if (status === "Approved") {
    htmlContent = `
    <html>
      <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; margin: 0; padding: 0;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9f9f9; padding: 20px 0;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.1);">
                <tr>
                  <td style="padding: 30px; color: #555555; font-size: 16px; line-height: 1.5;">
                    <p>Dear <strong>${userName}</strong>,</p>
                    <p>Congratulations! Your documents have been successfully verified on Getatrade Link Ltd.</p>
                    <p>This means that you're now fully accredited to connect with prospective clients and start securing new job leads through our platform.</p>
                    <p>Thank you for choosing Getatrade Link Ltd, we're excited to help you grow your business!</p>
                    <p>If you have any questions or need assistance, please feel free to reach out to us.</p>
                    <p style="margin-top: 30px;">Best regards,<br><strong>Getatrade Link Ltd Team</strong></p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 20px; background-color: #f0f0f0; border-radius: 0 0 8px 8px; text-align: center; font-size: 12px; color: #999999;">
                    &copy; 2025 Getatradelink. All rights reserved.
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
  } else {
    htmlContent = `
    <html>
      <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; margin: 0; padding: 0;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9f9f9; padding: 20px 0;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.1);">
                <tr>
                  <td style="padding: 30px; color: #555555; font-size: 16px; line-height: 1.5;">
                    <p>Dear <strong>${userName}</strong>,</p>
                    <p>We regret to inform you that your document submission has been <strong>rejected</strong> on Getatrade Link Ltd.</p>
                    <p><strong>Reason:</strong></p>
                    <p>${reason}<p>
                    <p>Unfortunately, this means you are not currently eligible to access client leads or connect with customers through our platform.</p>
                    <p>If you believe this decision was made in error or you'd like to reapply, you're welcome to submit your documents again for review.</p>
                    <p>Thank you for your interest in Getatrade Link Ltd. If you have any questions or need support, please don't hesitate to contact us.</p>
                    <p style="margin-top: 30px;">Best regards,<br><strong>Getatrade Link Ltd Team</strong></p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 20px; background-color: #f0f0f0; border-radius: 0 0 8px 8px; text-align: center; font-size: 12px; color: #999999;">
                    &copy; 2025 Getatradelink. All rights reserved.
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
  }
  return htmlContent;
};
