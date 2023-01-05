import { ChargeService } from '@services/charge.service';
import { prismaMock } from '../mocks/prisma/singleton';

describe('Charge Service', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  const chargeStub = {
    id: '2',
    status: 'PENDENTE',
    ciclista: '1',
    valor: 10,
    horaSolicitacao: new Date(),
    horaFinalizacao: null as Date | null,
  };

  describe('createCharge function', () => {
    it('should return a Charge Object when passing ciclista and valor properties', async () => {
      prismaMock.charge.create.mockResolvedValue(chargeStub);

      expect(
        ChargeService.createCharge({
          valor: 10,
          ciclista: '2',
        })
      ).resolves.toEqual(chargeStub);
    });
  });

  describe('getChargeById function', () => {
    it('should return a Charge Object', async () => {
      prismaMock.charge.findUnique.mockResolvedValue(chargeStub);

      expect(ChargeService.getChargeById(chargeStub.id)).resolves.toEqual(
        chargeStub
      );
    });
  });
});
