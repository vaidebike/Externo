import request from 'supertest';
import app from '../../app';
import { verifyPaymentDetails } from '../../services/payment.service';

describe('/validaCartaoDeCredito', () => {
  const validCard = {
    nomeTitular: 'JOHN DOE',
    numero: '5555555555554444',
    validade: '12/2023',
    cvv: '100',
  };

  const invalidName = {
    nomeTitular: '3',
    numero: '5555555555554444',
    validade: '12/2023',
    cvv: '100',
  };

  const invalidNumber = {
    nomeTitular: 'JOHN DOE',
    numero: '0000000000000000',
    validade: '12/2023',
    cvv: '100',
  };

  const invalidDate = {
    nomeTitular: 'JOHN DOE',
    numero: '5555555555554444',
    validade: '12/2020',
    cvv: '100',
  };

  const invalidCvv = {
    nomeTitular: 'JOHN DOE',
    numero: '5555555555554444',
    validade: '12/2023',
    cvv: '000',
  };

  describe('given a valid card', () => {
    test('should return true to a valid card', () => {
      const isValid = verifyPaymentDetails(validCard);

      expect(isValid).toBe(true);
    });

    test('should return a 200 status code', async () => {
      const response = await request(app)
        .post('/validaCartaoDeCredito')
        .send(validCard);

      expect(response.statusCode).toBe(200);
    });
  });

  describe('given an invalid card', () => {
    test('should return false to an invalid card', () => {
      const isValid = [
        invalidName,
        invalidNumber,
        invalidDate,
        invalidCvv,
      ].every((card) => !verifyPaymentDetails(card));

      expect(isValid).toBe(false);
    });

    test('should return a 400 status code', async () => {
      const response = await request(app)
        .post('/validaCartaoDeCredito')
        .send(invalidName);

      expect(response.statusCode).toBe(422);
    });
  });
});
