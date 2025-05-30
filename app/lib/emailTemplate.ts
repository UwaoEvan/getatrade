import * as Brevo from "@getbrevo/brevo";

export const sendEmail = async (
  to: string,
  subject: string,
  jobTitle: string,
  userName: string,
  role: string,
) => {
  const apiInstance = new Brevo.TransactionalEmailsApi();
  apiInstance.setApiKey(
    Brevo.TransactionalEmailsApiApiKeys.apiKey,
    process.env.BREVO_API_KEY || "",
  );

  let htmlContent;
  if (role === "customer") {
    htmlContent = generateHtmlContent(jobTitle, userName, "customer");
  } else {
    htmlContent = generateHtmlContent(jobTitle, userName, "tradesperson");
  }

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

const generateHtmlContent = (
  jobTitle: string,
  userName: string,
  role: string,
) => {
  let htmlContent;
  if (role === "tradesperson") {
    htmlContent = `
    <html>
      <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; margin: 0; padding: 0;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9f9f9; padding: 20px 0;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.1);">
                <tr>
                  <td style="padding: 30px; text-align: center; border-bottom: 1px solid #eeeeee;">
                    <h1 style="color: #333333; margin: 0;">Someone's Interested in Your Job Posting!</h1>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 30px; color: #555555; font-size: 16px; line-height: 1.5;">
                    <p>Hi <strong>${userName}</strong>,</p>
                    <p>Good news! Someone has shown interest in your job posting titled <strong>"${jobTitle}"</strong>.</p>
                    <p>You can now review their profile and get in touch to move forward.</p>
                    <table cellpadding="0" cellspacing="0" style="margin: 20px 0;">
                      <tr>
                        <td align="center">
                          <a href="http://getatradelinkltd.vercel.app/my-jobs" style="background-color: #007BFF; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
                            View Interested Candidate
                          </a>
                        </td>
                      </tr>
                    </table>
                    <p>If you have any questions, feel free to reply to this email or contact our support team.</p>
                    <p>Thank you for using <strong>Getatradelinkltd</strong>!</p>
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
                  <td style="padding: 30px; text-align: center; border-bottom: 1px solid #eeeeee;">
                    <h1 style="color: #333333; margin: 0;">You have been shortlisted!</h1>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 30px; color: #555555; font-size: 16px; line-height: 1.5;">
                    <p>Hi <strong>${userName}</strong>,</p>
                    <p>Good news! You have been shortlisted in job posting titled <strong>"${jobTitle}"</strong>.</p>
                    <p>You can now complete the payment and get in touch to move forward.</p>
                    <table cellpadding="0" cellspacing="0" style="margin: 20px 0;">
                      <tr>
                        <td align="center">
                          <a href="http://getatradelinkltd.vercel.app/interested" style="background-color: #007BFF; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
                            View job details
                          </a>
                        </td>
                      </tr>
                    </table>
                    <p>If you have any questions, feel free to reply to this email or contact our support team.</p>
                    <p>Thank you for using <strong>Getatradelinkltd</strong>!</p>
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

export const sendSignupEmail = async (
  to: string,
  subject: string,
  userName: string,
  role: String,
) => {
  const apiInstance = new Brevo.TransactionalEmailsApi();
  apiInstance.setApiKey(
    Brevo.TransactionalEmailsApiApiKeys.apiKey,
    process.env.BREVO_API_KEY || "",
  );

  const customer = role === "customer";
  const htmlContent = `
    <html>
      <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; margin: 0; padding: 0;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9f9f9; padding: 20px 0;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.1);">
                <tr>
                  <td style="padding: 30px; text-align: center; border-bottom: 1px solid #eeeeee;">
                    <h1 style="color: #333333; margin: 0;">Someone's Interested in Your Job Posting!</h1>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 30px; color: #555555; font-size: 16px; line-height: 1.5;">
                    <p>Hi <strong>Admin</strong>,</p>
                    <p>Good news! Someone has signed up at getatradelinkltd platform. Email: <strong>"${userName}"</strong> and role: <strong>${customer ? role : "Tradesperson"}</strong>.</p>
                    <p>You can now review their profile and get in touch to move forward.</p>                    
                  </td>
                </tr>
          </table>
        </body>
    </html>
  `;

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
