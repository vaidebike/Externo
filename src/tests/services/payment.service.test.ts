import { verifyPaymentDetails } from '../../services/payment.service';

describe('/validaCartaoDeCredito', () => {
  const validCard = {
    nomeTitular: 'JOHN DOE',
    numero: '5555555555554444',
    validade: '12/2023',
    cvv: '100',
  };

  const invalidName = {
    ...validCard,
    nomeTitular: '3',
  };

  const invalidNumber = {
    ...validCard,
    numero: '0000000000000000',
  };

  const invalidDate = {
    ...validCard,
    validade: '12/2020',
  };

  const invalidCvv = {
    ...validCard,
    cvv: '000',
  };

  describe('verifyPaymentDetails function', () => {
    it('should return true to a valid card', () => {
      const isValid = verifyPaymentDetails(validCard);

      expect(isValid).toBe(true);
    });

    it('should return false to an invalid card', () => {
      const isValid = [
        invalidName,
        invalidNumber,
        invalidDate,
        invalidCvv,
      ].every((card) => !verifyPaymentDetails(card));

      expect(isValid).toBe(false);
    });
  });
});
