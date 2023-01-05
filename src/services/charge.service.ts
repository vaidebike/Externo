import { Charge, Prisma } from '@prisma/client';
import prisma from 'prisma.client';

const createCharge = async ({
  ciclista,
  valor,
}: Prisma.ChargeCreateInput): Promise<Charge> => {
  const newCharge = await prisma.charge.create({
    data: {
      ciclista,
      valor,
    },
  });

  return newCharge;
};

const getChargeById = async (id: string): Promise<Charge | null> => {
  const charge = await prisma.charge.findUnique({
    where: {
      id,
    },
  });

  return charge;
};

export const ChargeService = {
  createCharge,
  getChargeById,
};
