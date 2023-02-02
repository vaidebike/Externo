import { RequestHandler } from 'express';
import { isValidChargeStatus, isValidNewCharge } from 'forms/charge.form';
import { ChargeService } from '../services/charge.service';
import { errors } from '../views/errors/error';

export const listCharges: RequestHandler = async (req, res) => {
  const charges = ChargeService.listCharges();

  return res.status(200).send({ data: charges });
};

export const listChargeQueue: RequestHandler = async (req, res) => {
  const charges = ChargeService.listChargeQueue();

  return res.status(200).send({ data: charges });
};

export const getChargeById: RequestHandler = async (req, res) => {
  const { id } = req.params;

  const charge = ChargeService.getChargeById(id);

  if (charge) {
    return res.status(200).send({ data: charge });
  } else {
    return res.status(404).send(errors.notFoundError);
  }
};

export const createCharge: RequestHandler = async (req, res) => {
  const { ciclista, valor } = req.body;

  if (isValidNewCharge(ciclista, valor)) {
    const charge = ChargeService.createCharge({ ciclista, valor });
    ChargeService.processPayment(charge);
    return res.status(200).send({ data: charge });
  } else {
    return res.status(422).send(errors.invalidDataError);
  }
};

export const updateChargeStatus: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (isValidChargeStatus(status)) {
    const updatedCharge = ChargeService.updateChargeStatus(id, status);

    if (updatedCharge) {
      return res.status(200).send({ data: updatedCharge });
    } else {
      return res.status(404).send(errors.notFoundError);
    }
  } else {
    return res.status(422).send(errors.invalidDataError);
  }
};

export const addToChargeQueue: RequestHandler = async (req, res) => {
  const { ciclista, valor } = req.body;

  if (isValidNewCharge(ciclista, valor)) {
    const charge = ChargeService.addToChargeQueue({ ciclista, valor });
    return res.status(200).send({ data: charge });
  } else {
    return res.status(422).send(errors.invalidDataError);
  }
};

export const processChargeQueue: RequestHandler = async (req, res) => {
  try {
    const charges = await ChargeService.processChargeQueue();

    if (charges) {
      return res.status(200).send({ data: charges });
    } else {
      return res.status(422).send(errors.invalidDataError);
    }
  } catch (e) {
    return res.status(500).send(errors.serverError);
  }
};
