import request from 'supertest';
import app from '../../app';

describe('validaCartaoDeCredito Controller', () => {
  const card = {
    nomeTitular: 'JOHN DOE',
    numero: '5555555555554444',
    validade: '12/2023',
    cvv: '100',
  };

  it('should return a 200 status code', async () => {
    const response = await request(app)
      .post('/validaCartaoDeCredito')
      .send(card);

    expect(response.statusCode).toBe(200);
  });

  it('should return a 400 status code', async () => {
    const response = await request(app)
      .post('/validaCartaoDeCredito')
      .send({ ...card, nomeTitular: '3' });

    expect(response.statusCode).toBe(422);
  });
});
