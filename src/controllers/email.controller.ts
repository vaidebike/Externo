import { RequestHandler } from 'express';
import { v4 as uuid } from 'uuid';

import { EmailService } from '../services/email.service';
import { errors } from '../views/errors/error';

export const sendEmail: RequestHandler = async (req, res) => {
  const { email, mensagem } = req.body;

  console.log('test');

  if (!email || !mensagem) {
    return res.status(422).send(errors.invalidDataError);
  }

  const sgRes = await EmailService.sendEmail({
    email,
    mensagem,
  });

  if (sgRes.code >= 400) {
    return res.status(500).send(errors.serverError);
  }

  return res.status(200).json({ id: uuid(), email: email, mensagem: mensagem });
};
