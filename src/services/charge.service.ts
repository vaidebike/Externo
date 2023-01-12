import { Charge, ChargeStatus } from '@models/charge';
import db from 'database/db';
import { v4 } from 'uuid';

const listCharges = (): Charge[] => {
  return db.charges;
};

const listChargeQueue = (): Charge[] => {
  return db.chargeQueue;
};

const createCharge = ({
  ciclista,
  valor,
}: {
  ciclista: string;
  valor: number;
}): Charge => {
  const date = new Date().toISOString();

  const charge: Charge = {
    id: v4(),
    status: 'PENDENTE',
    ciclista,
    valor,
    horaFinalizacao: null,
    horaSolicitacao: date,
  };

  db.charges.push(charge);

  return charge;
};

const getChargeById = (id: string): Charge | undefined => {
  const charge = db.charges.find((charge) => charge.id === id);

  return charge;
};

const updateChargeStatus = (
  chargeId: string,
  status: ChargeStatus
): Charge | undefined => {
  const chargeIndex = db.charges.findIndex((c) => c.id === chargeId);

  if (chargeIndex === -1) {
    return undefined;
  } else {
    const charge = (db.charges[chargeIndex] = {
      ...db.charges[chargeIndex],
      status,
    });

    charge.horaFinalizacao =
      status === 'PENDENTE' ? null : new Date().toISOString();

    return charge;
  }
};

const addToChargeQueue = ({
  ciclista,
  valor,
}: {
  ciclista: string;
  valor: number;
}): Charge => {
  const charge = createCharge({ ciclista, valor });

  db.chargeQueue.push(charge);

  return charge;
};

export const ChargeService = {
  listCharges,
  createCharge,
  getChargeById,
  updateChargeStatus,
  addToChargeQueue,
  listChargeQueue,
};
