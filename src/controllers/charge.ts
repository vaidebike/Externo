import { RequestHandler } from 'express';

import { chargesMock } from '../mocks/charge';

export const listCharges: RequestHandler = (req, res) => {
  res.status(200).send({
    meta: {
      total: chargesMock.length,
    },
    data: chargesMock,
  });
};

export const getCharge: RequestHandler = (req, res) => {
  const { id } = req.params;

  res.status(200).send({ data: chargesMock.find((c) => c.id === id) });
};
