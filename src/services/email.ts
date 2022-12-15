import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const SENDER = process.env.SENDGRID_SENDER_EMAIL;

export type EmailTemplate = {
  to: string;
  subject: string;
  text: string;
  html: string;
};

const sendEmail = async ({ to, subject, text, html }: EmailTemplate) => {
  sgMail
    .send({
      from: SENDER,
      to,
      subject,
      text,
      html,
    })
    .then((res) => res)
    .catch((err) => err);
};

export const EmailService = {
  sendEmail,
};
