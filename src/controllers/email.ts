import { RequestHandler } from 'express';
import { EmailService, EmailTemplate } from '../services/email';

export const sendEmail: RequestHandler = async (req, res) => {
  console.log(req);

  const { to, subject, text, html } = req.body;

  const msg: EmailTemplate = {
    to,
    subject,
    text,
    html,
  };

  try {
    await EmailService.sendEmail(msg);
    res.status(200).send({ data: 'Email sent' });
  } catch (err) {
    res.status(500).send({ error: err });
  }
};
