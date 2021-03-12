import sgMail, { MailDataRequired } from "@sendgrid/mail";
import config from "../../../../Config";

export const generetateVerificationEmail = (
  userEmail: string,
  token: string
) => {
  return {
    to: userEmail,
    from: config.EMAIL_SENDER!, // Use the email address or domain you verified above
    subject: "Verify your account",
    text: `Verify your account here ${config.BE_URI}/api/v1/auth/verify/${token}`,
    html: `<strong>Thank you for registering to Alumnor LMS. <br>Click <a href="${config.BE_URI}/api/v1/auth/verify/${token}">here</a> to verify your account</strong>`,
  };
};

export const generetateResetPasswordEmail = (
  userEmail: string,
  token: string
) => {
  return {
    to: userEmail,
    from: config.EMAIL_SENDER!, // Use the email address or domain you verified above
    subject: "Alumnor Password Reset",
    text: `We have just received a password reset request for ${userEmail}. Verify your account here ${config.BE_URI}/api/v1/auth/verify/${token}`,
    html: `<strong><p>We have just received a password reset request for ${userEmail}.</p>Please click <a href="${config.FE_URI}/password-reset/${token}">here</a> to reset your password</strong>`,
  };
};

export const sendEmail = async (msg: MailDataRequired) => {
  try {
    sgMail.setApiKey(config.SENDGRID_API_KEY!);
    const messageSent = await sgMail.send(msg);
  } catch (err) {
    if (err.response) {
      console.error(err.response.body);
    }
    return null;
  }
};
