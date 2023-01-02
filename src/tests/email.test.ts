import request from 'supertest';
import app from '../app';
import { EmailService } from '../services/email';

jest.setTimeout(10000);

describe('/enviarEmail', () => {
  const validRequest = {
    email: 'test',
    mensagem: 'test',
  };

  const invalidRequest = {
    email: 'test',
  };

  describe('sendEmail service', () => {
    test('should not return a 404 status code', async () => {
      const response = await EmailService.sendEmail(validRequest);

      expect(response.statusCode).not.toBe(404);
    });

    test('should return an error message', async () => {
      const response = await EmailService.sendEmail(validRequest);

      expect(response).toHaveProperty('message');
    });
  });

  describe('given a valid request', () => {
    test('should return a 500 status code error', async () => {
      const response = await request(app)
        .post('/enviarEmail')
        .send(validRequest);

      expect(response.statusCode).toBe(500);
    });
  });

  describe('given an invalid request', () => {
    test('should return a 500 status code', async () => {
      const response = await request(app)
        .post('/enviarEmail')
        .send(invalidRequest);

      expect(response.statusCode).toBe(422);
    });
  });
});
