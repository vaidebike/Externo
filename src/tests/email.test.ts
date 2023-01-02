import request from 'supertest';
import app from '../app';
import { EmailService } from '../services/email';

jest.setTimeout(10000);

describe('/enviarEmail', () => {
  const validData = {
    email: process.env.SENDGRID_SENDER_EMAIL,
    mensagem: 'Teste',
  };

  const invalidData = {
    mensagem: 'Teste',
  };

  const incorrectEmailData = {
    email: '-',
    mensagem: 'Teste',
  };

  describe('sendEmail service', () => {
    test('should not return a 404 status code', async () => {
      const response = await EmailService.sendEmail(incorrectEmailData);

      expect(response.statusCode).not.toBe(404);
    });

    test('should return an error message', async () => {
      const response = await EmailService.sendEmail(incorrectEmailData);

      expect(response).toHaveProperty('message');
    });
  });

  describe('given a valid request', () => {
    test('should return a 200 status code, an id, email and the message sent', async () => {
      const response = await request(app).post('/enviarEmail').send(validData);
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('email');
      expect(response.body).toHaveProperty('mensagem');
    });
  });

  describe('given an invalid request', () => {
    test('should return a 422 status code', async () => {
      const response = await request(app)
        .post('/enviarEmail')
        .send(invalidData);

      expect(response.statusCode).toBe(422);
    });
  });

  describe('given an incorrect email valid request', () => {
    test('should return a 500 status code, an id, email and the message sent', async () => {
      const response = await request(app)
        .post('/enviarEmail')
        .send(incorrectEmailData);

      expect(response.statusCode).toBe(500);
    });
  });
});
