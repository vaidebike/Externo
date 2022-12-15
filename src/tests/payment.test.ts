import { verifyPaymentDetails } from '../services/payment';

describe('verifyPaymentDetails function', () => {
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

  test('should return true to a valid card', () => {
    const isValid = verifyPaymentDetails(validCard);

    expect(isValid).toBe(true);
  });

  test('should return false to an invalid card', () => {
    const isValid = [invalidName, invalidNumber, invalidDate, invalidCvv].every(
      (card) => !verifyPaymentDetails(card)
    );

    expect(isValid).toBe(false);
  });
});
