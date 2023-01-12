import { ChargeService } from '@services/charge.service';

jest.genMockFromModule('../../database/db.ts');

describe('Charge Service', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('listCharges service', () => {
    it('should return a Charge Object when empty', () => {
      const charges = ChargeService.listCharges();

      expect(charges).toMatchObject([]);
    });

    it('should return a Charge Object when filled', () => {
      const charge = ChargeService.createCharge({
        ciclista: 'test',
        valor: 100,
      });

      const charges = ChargeService.listCharges();

      expect(charges).toMatchObject([charge]);
    });
  });

  describe('listChargeQueue service', () => {
    it('should return a Charge Object when empty', () => {
      const charges = ChargeService.listChargeQueue();

      expect(charges).toMatchObject([]);
    });

    it('should return a Charge Object when filled', () => {
      const charge = ChargeService.addToChargeQueue({
        ciclista: 'test',
        valor: 100,
      });

      const charges = ChargeService.listChargeQueue();

      expect(charges).toMatchObject([charge]);
    });
  });

  describe('createCharge service', () => {
    it('should return a Charge Object', () => {
      const charge = ChargeService.createCharge({
        ciclista: 'test',
        valor: 100,
      });

      expect(charge).toMatchObject({
        id: expect.any(String),
        status: 'PENDENTE',
        ciclista: 'test',
        valor: 100,
        horaSolicitacao: expect.any(String),
      });
    });
  });

  describe('getChargeById service', () => {
    it('should return a Charge Object', () => {
      const charge = ChargeService.createCharge({
        ciclista: 'test',
        valor: 100,
      });

      const chargeById = ChargeService.getChargeById(charge.id);

      expect(chargeById).toMatchObject({
        id: expect.any(String),
        status: 'PENDENTE',
        ciclista: 'test',
        valor: 100,
        horaSolicitacao: expect.any(String),
      });
    });
  });

  describe('updateChargeStatus service', () => {
    it('should return a Charge Object', () => {
      const charge = ChargeService.createCharge({
        ciclista: 'test',
        valor: 100,
      });

      const updatedCharge = ChargeService.updateChargeStatus(charge.id, 'PAGA');

      expect(updatedCharge).toMatchObject({
        id: charge.id,
        status: 'PAGA',
        ciclista: 'test',
        valor: 100,
        horaSolicitacao: charge.horaSolicitacao,
        horaFinalizacao: expect.any(String),
      });
    });

    it('should return a Charge Object with a horaFinalizacao value', () => {
      const charge = ChargeService.createCharge({
        ciclista: 'test',
        valor: 100,
      });

      const updatedCharge = ChargeService.updateChargeStatus(charge.id, 'PAGA');

      expect(updatedCharge).toMatchObject({
        id: charge.id,
        status: 'PAGA',
        ciclista: 'test',
        valor: 100,
        horaSolicitacao: charge.horaSolicitacao,
        horaFinalizacao: expect.any(String),
      });
    });

    it('should return a Charge Object with a horaFinalizacao value as null', () => {
      const charge = ChargeService.createCharge({
        ciclista: 'test',
        valor: 100,
      });

      const updatedCharge = ChargeService.updateChargeStatus(
        charge.id,
        'PENDENTE'
      );

      expect(updatedCharge).toMatchObject({
        id: charge.id,
        status: 'PENDENTE',
        ciclista: 'test',
        valor: 100,
        horaSolicitacao: charge.horaSolicitacao,
        horaFinalizacao: null,
      });
    });

    it('should return undefined when charge is not found', () => {
      const updatedCharge = ChargeService.updateChargeStatus('id', 'PAGA');

      expect(updatedCharge).toBeUndefined();
    });
  });

  describe('addToChargeQueue service', () => {
    it('should return a Charge Object', () => {
      const charge = ChargeService.addToChargeQueue({
        ciclista: 'test',
        valor: 100,
      });

      expect(charge).toMatchObject(charge);
    });
  });
});
