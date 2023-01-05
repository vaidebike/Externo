import request from 'supertest';

import { EmailService } from '@services/email.service';

import app from 'app';

jest.mock('@services/email.service');
const emailServiceMock = jest.mocked(EmailService);

describe('Email Controller', () => {
  const validRequest = {
    email: 'test@email.com',
    mensagem: 'test',
  };

  const invalidRequest = {
    mensagem: 'test',
  };

  describe('sendEmail controller', () => {
    it('should return a 200 Status Code on SendGrid success', async () => {
      emailServiceMock.sendEmail.mockResolvedValue({
        statusCode: 202,
        body: {},
        headers: {},
      });

      const res = await request(app).post('/enviarEmail').send(validRequest);

      expect(res.statusCode).toBe(200);
    });

    it('should return a 500 Status Code on SendGrid error', async () => {
      emailServiceMock.sendEmail.mockResolvedValue({
        statusCode: 500,
        body: {},
        headers: {},
      });

      const res = await request(app).post('/enviarEmail').send(validRequest);

      expect(res.statusCode).toBe(500);
    });

    it('should return a 422 Status Code on invalid request', async () => {
      emailServiceMock.sendEmail.mockResolvedValue({
        statusCode: 500,
        body: {},
        headers: {},
      });

      const res = await request(app).post('/enviarEmail').send(invalidRequest);

      expect(res.statusCode).toBe(422);
    });
  });
});
