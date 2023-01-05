import sgMail from '@sendgrid/mail';
import { EmailService } from '../../services/email.service';

jest.mock('@sendgrid/mail');
const sgMailMock = jest.mocked(sgMail);

describe('Email Service', () => {
  describe('sendEmail service', () => {
    jest.mock('@sendgrid/mail');

    beforeEach(() => {
      jest.resetAllMocks();
    });

    it('should return a Client Response Object', async () => {
      sgMailMock.send.mockResolvedValue([
        {
          statusCode: 202,
          body: {},
          headers: {},
        },
        {},
      ]);

      const res = await EmailService.sendEmail({
        email: 'test@email.com',
        mensagem: 'test message',
      });

      expect(res.statusCode).toBe(202);
    });
  });
});
