import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const SENDER = process.env.SENDGRID_SENDER_EMAIL;

export type EmailTemplate = {
  email: string;
  mensagem: string;
};

const sendEmail = async ({ email, mensagem }: EmailTemplate) => {
  sgMail
    .send({
      from: SENDER,
      to: email,
      subject: 'VaiDeBike',
      text: mensagem,
      html: `<p>${mensagem}</p>`,
    })
    .then((res) => res)
    .catch((err) => err);
};

export const EmailService = {
  sendEmail,
};