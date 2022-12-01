import { faker } from '@faker-js/faker';

import { Charge } from '../models/charge';

export const createFakeCharge = (): Charge => ({
  id: faker.datatype.uuid(),
  status: 'CANCELADA',
  horaFinalizacao: faker.datatype.datetime().toISOString(),
  horaSolicitacao: faker.datatype.datetime().toISOString(),
  valor: faker.datatype.float(),
  ciclista: faker.datatype.uuid(),
});

export const chargesMock: Charge[] = [...Array(5)].map(() =>
  createFakeCharge()
);
