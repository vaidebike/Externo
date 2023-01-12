import { isValidChargeStatus, isValidNewCharge } from 'forms/charge.form';

describe('Charge Validator', () => {
  describe('isValidNewCharge function', () => {
    it('should return true when valid', () => {
      const isValid = isValidNewCharge('test', 100);

      expect(isValid).toBe(true);
    });

    it('should return false when the id is invalid', () => {
      const isValid = isValidNewCharge('', 100);

      expect(isValid).toBe(false);
    });

    it('should return false when the number invalid', () => {
      const isValid = isValidNewCharge('test', -100);

      expect(isValid).toBe(false);
    });

    it('should return false when the number and the id are invalid', () => {
      const isValid = isValidNewCharge('', -100);

      expect(isValid).toBe(false);
    });
  });

  describe('isValidChargeStatus function', () => {
    it('should return true when valid', () => {
      const isValid = isValidChargeStatus('PENDENTE');

      expect(isValid).toBe(true);
    });

    it('should return false when invalid', () => {
      const isValid = isValidChargeStatus('INVALID');

      expect(isValid).toBe(false);
    });
  });
});
