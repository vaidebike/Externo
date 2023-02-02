import Stripe from 'stripe';
import { v4 } from 'uuid';

import { Charge, ChargeStatus } from '@models/charge';
import db from 'database/db';

const paymentApi = new Stripe(process.env.STRIPE_API_KEY || '', {
  apiVersion: '2022-11-15',
});

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
    db.charges[chargeIndex] = {
      ...db.charges[chargeIndex],
      status,
      horaFinalizacao: status === 'PENDENTE' ? null : new Date().toISOString(),
    };

    return db.charges[chargeIndex];
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

const processChargeQueue = async (): Promise<Charge[]> => {
  let processedCharges: Charge[] = [];

  for (const charge of db.chargeQueue) {
    let updatedCharge: Charge | undefined;

    try {
      const { status } = await paymentApi.charges.create({
        amount: charge.valor * 100,
        currency: 'brl',
        source: 'tok_visa',
        description: charge.id,
      });

      if (status === 'pending') {
        continue;
      } else {
        updatedCharge = updateChargeStatus(
          charge.id,
          status === 'succeeded' ? 'PAGA' : 'FALHA'
        );
      }
    } catch (err) {
      updatedCharge = updateChargeStatus(charge.id, 'FALHA');
    }

    processedCharges = [...processedCharges, updatedCharge || charge];
  }

  db.chargeQueue = processedCharges.filter(
    (charge) => charge.status === 'PENDENTE'
  );

  return processedCharges;
};

export const ChargeService = {
  listCharges,
  createCharge,
  getChargeById,
  updateChargeStatus,
  addToChargeQueue,
  listChargeQueue,
  processChargeQueue,
};
