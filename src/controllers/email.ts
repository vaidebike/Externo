import { RequestHandler } from 'express';
import { v4 as uuid } from 'uuid';

import { EmailService } from '../services/email';
import { errors } from '../views/errors/error';

export const sendEmail: RequestHandler = async (req, res) => {
  const { email, mensagem } = req.body;

  if (!email || !mensagem) {
    return res.status(422).send(errors.invalidDataError);
  }

  try {
    await EmailService.sendEmail({
      email,
      mensagem,
    });
    return res
      .status(200)
      .json({ id: uuid(), email: email, mensagem: mensagem });
  } catch (err) {
    return res.status(500).send(errors.serverError);
  }
};
