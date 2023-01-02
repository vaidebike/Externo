import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY || 'SG.0');

const SENDER = process.env.SENDGRID_SENDER_EMAIL;

export type EmailTemplate = {
  email: string;
  mensagem: string;
};

const sendEmail = async ({ email, mensagem }: EmailTemplate) => {
  const res = await sgMail
    .send({
      from: SENDER,
      to: email,
      subject: 'VaiDeBike',
      text: mensagem,
      html: `<p>${mensagem}</p>`,
    })
    .then((res) => res)
    .catch((err) => err);

  return res;
};

export const EmailService = {
  sendEmail,
};
