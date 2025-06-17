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
  role: string,
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
                    <h1 style="color: #333333; margin: 0;">Someone just signed up!</h1>
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

export const sendJobPostEmail = async (
  to: string,
  subject: string,
  userName: string,
  jobTitle: string,
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
                  <h1 style="color: #333333; margin: 0;">Thank you for the job post!</h1>
                </td>
              </tr>
              <tr>
                <td style="padding: 30px; color: #555555; font-size: 16px; line-height: 1.5;">
                  <p>Hello <strong>${userName}</strong>,</p>
                  <p>Thank you for posting your <strong>${jobTitle} job</strong>. We'll now help you find available tradespeople near you.</p>
                  <p><strong>Next Steps:</strong></p>
                  <ul>
                    <li>We sent your job to relevant tradespeople near you.</li>
                    <li>Getatrade link sends you an email and text message when a tradesperson expresses interest.</li>
                    <li>Start chats with tradespeople to share contact details. Then you can discuss the job on our platform or using their phone or email.</li>
                    <li>Hire the right tradesperson and leave a review when the job is done.</li>
                  </ul>
                  <p><strong>Get more responses</strong></p>
                  <p>You can invite up to 10 more recommended tradespeople to quote on your job.</p>
                  <p>Best,<br>Getatrade link Team</p>
                  <p style="font-size: 12px; color: #999999;">Do not share this email with others to prevent unauthorised access to your account.</p>
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

export const sendWelcomeEmail = async (
  to: string,
  subject: string,
  userName: string,
  role: string,
) => {
  const apiInstance = new Brevo.TransactionalEmailsApi();
  apiInstance.setApiKey(
    Brevo.TransactionalEmailsApiApiKeys.apiKey,
    process.env.BREVO_API_KEY || "",
  );
  const customer = role === "customer";
  const htmlContent = customer
    ? `<html>
    <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; margin: 0; padding: 0;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9f9f9; padding: 20px 0;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.1);">
              <tr>
                <td style="padding: 30px; text-align: center; border-bottom: 1px solid #eeeeee;">
                  <h1 style="color: #333333; margin: 0;">Welcome to Getatrade Link Ltd – Let's Get You Started!</h1>
                </td>
              </tr>
              <tr>
                <td style="padding: 30px; color: #555555; font-size: 16px; line-height: 1.6;">
                  <p>Hello <strong>${userName}</strong>,</p>
                  <p>Welcome to <strong>Getatrade Link Ltd</strong>! We’re so glad to have you here!</p>
                  <p>You have just taken a big step toward getting your job sorted with a trusted local tradesperson.</p>
                  <p>Your job is now live on our platform, and tradesperson are being matched as we speak. Once someone’s available and interested, they’ll get in touch with you directly.</p>
                  <p>We Keep things simple-no bidding wars, no overwhelming choices. Just Skilled people ready to get the job done.</p>
                  <p><strong>Next Steps::</strong></p>
                  <ul>
                    <li><strong>You’ll be contacted soon by a local tradesperson.</li>
                    <li><strong>Discuss the details together and agree on the work.</li>
                    <li><strong>Leave a review after the job- your feedback helps others just like you!</li>
                    <li><strong>Verify Your Identity:</strong> Completing our verification process increases your credibility and trustworthiness.</li>
                  </ul>
                  <p>If you have any questions or need help along the way, we’re only message away.</p>
                  <p>Thanks again for choosing GetaTrade Link- your job just got easier.</p>
                  <p style="margin-top: 30px;">Best regards,<br><strong>Getatrade Link Ltd Team</strong></p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>
`
    : `<html>
    <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; margin: 0; padding: 0;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9f9f9; padding: 20px 0;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.1);">
              <tr>
                <td style="padding: 30px; text-align: center; border-bottom: 1px solid #eeeeee;">
                  <h1 style="color: #333333; margin: 0;">Welcome to Getatrade Link Ltd – Let's Get You Started!</h1>
                </td>
              </tr>
              <tr>
                <td style="padding: 30px; color: #555555; font-size: 16px; line-height: 1.6;">
                  <p>Hi <strong>${userName}</strong>,</p>
                  <p>Welcome to <strong>Getatrade Link Ltd</strong>! We're thrilled to have you join our community of skilled tradespeople connecting with homeowners seeking quality work.</p>
                  <p><strong>Here's how to make the most of your new account:</strong></p>
                  <ul>
                    <li><strong>Complete Your Profile:</strong> Add details about your services, experience, and qualifications. A comprehensive profile helps build trust with potential clients.</li>
                    <li><strong>Upload Photos:</strong> Showcase your previous projects. Visuals can significantly impact a homeowner's decision to hire.</li>
                    <li><strong>Set Your Preferences:</strong> Specify the types of jobs you're interested in and the areas you cover to receive the most relevant leads.</li>
                    <li><strong>Verify Your Identity:</strong> Completing our verification process increases your credibility and trustworthiness.</li>
                  </ul>
                  <p>Once your profile is set up, you'll start receiving job opportunities that match your skills and preferences. Remember, the more complete and detailed your profile, the better your chances of securing work.</p>
                  <p>If you have any questions or need assistance, our support team is here to help.</p>
                  <p><a href="https://www.getatradelinkltd.com/" style="display:inline-block; margin-top: 20px; padding: 10px 20px; background-color: #1a73e8; color: #ffffff; text-decoration: none; border-radius: 4px;">Get Started Now</a></p>
                  <p style="margin-top: 30px;">Best regards,<br><strong>Getatrade Link Ltd Team</strong></p>
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

type emails = {
  email: string;
};

export const notifyTradepeople = async (emails: emails[], jobTitle: string) => {
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
                  <p>Hello,</p>
                  <p>There's a new lead in your area of specialization!</p>
                  <p>Job title: <strong>${jobTitle} job</strong>.</p>
                  <p><strong>Next Steps:</strong></p>
                  <ul>
                    <li>Send a message for free to the customer to express interest in this lead.</li>
                    <li>You'll only pay if a customer shortlists you</li>
                    <li>Contact the customer as soon as you get the contact details for the best chance of getting hired.</li>
                  </ul>
                  <p>Do not share this email with others to prevent unauthorised access to your account.</p>
                  <p>To protect yourself from fraud and identity theft, please be cautious when sharing personal documents with other users. Contact us if you have any concerns or encounter suspicious requests.</p>
                  <p>Best,<br>Getatrade link Team</p>
                  <p style="font-size: 12px; color: #999999;">Do not share this email with others to prevent unauthorised access to your account.</p>
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
    bcc: emails,
    subject: "NEW LEADS",
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
