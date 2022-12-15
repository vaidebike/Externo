import { RequestHandler } from 'express';
import { PaymentService } from '../services/payment';
import { errors } from '../views/errors/error';

export const validatePaymentDetails: RequestHandler = async (req, res) => {
  const { nomeTitular, numero, validade, cvv } = req.body;

  const isValid = PaymentService.verifyPaymentDetails({
    nomeTitular,
    numero,
    validade,
    cvv,
  });

  if (isValid) {
    return res.status(200).send({ data: 'Dados atualizados' });
  } else {
    return res.status(422).send(errors.invalidDataError);
  }
};
