import { Charge, Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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

const getChargeById = async (id: string): Promise<Charge> => {
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
