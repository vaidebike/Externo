import { RequestHandler } from 'express';
import { ChargeService } from '../services/charge';
import { errors } from '../views/errors/error';

export const getChargeById: RequestHandler = async (req, res) => {
  const { id } = req.params;

  const charge = await ChargeService.getChargeById(id);

  if (charge) {
    return res.status(200).send({ data: charge });
  } else {
    return res.status(404).send(errors.notFoundError);
  }
};

export const createCharge: RequestHandler = async (req, res) => {
  const { ciclista, valor } = req.body;

  const charge = await ChargeService.createCharge({ ciclista, valor });

  return res.status(201).send({ data: charge });
};
