import request from 'supertest';

import { Charge } from '@models/charge';
import { ChargeService } from '@services/charge.service';
import app from 'app';

jest.mock('@services/charge.service');
const chargeServiceMock = jest.mocked(ChargeService);

const baseCharge: Charge = {
  id: 'id',
  status: 'PENDENTE',
  ciclista: 'test',
  valor: 100,
  horaSolicitacao: new Date().toISOString(),
  horaFinalizacao: null,
};

describe('Charge Controller', () => {
  const validRequest = {
    ciclista: 'test',
    valor: 100,
  };

  const invalidRequest = {
    ciclista: 'test',
  };

  describe('listCharges controller', () => {
    it('should return a 200 Status Code', async () => {
      chargeServiceMock.listCharges.mockReturnValue([]);

      const res = await request(app).get('/cobranca');

      expect(res.statusCode).toBe(200);
    });
  });

  describe('getChargeById controller', () => {
    it('should return a 200 Status Code', async () => {
      chargeServiceMock.getChargeById.mockReturnValue(baseCharge);

      const res = await request(app).get('/cobranca/id');

      expect(res.statusCode).toBe(200);
    });

    it('should return a 404 Status Code', async () => {
      chargeServiceMock.getChargeById.mockReturnValue(undefined);

      const res = await request(app).get('/cobranca/id');

      expect(res.statusCode).toBe(404);
    });
  });

  describe('createCharge controller', () => {
    it('should return a 200 Status Code', async () => {
      chargeServiceMock.createCharge.mockReturnValue(baseCharge);

      const res = await request(app).post('/cobranca').send(validRequest);

      expect(res.statusCode).toBe(200);
    });

    it('should return a 422 Status Code on invalid request', async () => {
      chargeServiceMock.createCharge.mockReturnValue(baseCharge);

      const res = await request(app).post('/cobranca').send(invalidRequest);

      expect(res.statusCode).toBe(422);
    });
  });

  describe('updateChargeStatus controller', () => {
    it('should return a 200 Status Code', async () => {
      chargeServiceMock.updateChargeStatus.mockReturnValue(baseCharge);

      const res = await request(app).patch('/cobranca/id').send({
        status: 'PENDENTE',
      });

      expect(res.statusCode).toBe(200);
    });

    it('should return a 422 Status Code on invalid request', async () => {
      chargeServiceMock.updateChargeStatus.mockReturnValue(baseCharge);

      const res = await request(app).patch('/cobranca/id').send({
        status: 'test',
      });

      expect(res.statusCode).toBe(422);
    });

    it('should return a 404 Status Code', async () => {
      chargeServiceMock.updateChargeStatus.mockReturnValue(undefined);

      const res = await request(app).patch('/cobranca/id').send({
        status: 'PENDENTE',
      });

      expect(res.statusCode).toBe(404);
    });
  });

  describe('addToChargeQueue controller', () => {
    it('should return a 200 Status Code', async () => {
      chargeServiceMock.addToChargeQueue.mockReturnValue(baseCharge);

      const res = await request(app).post('/filaCobranca').send(validRequest);

      expect(res.statusCode).toBe(200);
    });

    it('should return a 422 Status Code on invalid request', async () => {
      chargeServiceMock.addToChargeQueue.mockReturnValue(baseCharge);

      const res = await request(app).post('/filaCobranca').send(invalidRequest);

      expect(res.statusCode).toBe(422);
    });
  });
});
