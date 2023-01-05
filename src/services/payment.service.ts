import valid from 'card-validator';
import { PaymentDetails } from '../types/payment';

export const verifyPaymentDetails = ({
  nomeTitular,
  numero,
  validade,
  cvv,
}: PaymentDetails) => {
  const isNameValid = valid.cardholderName(nomeTitular).isValid;
  const isNumberValid = valid.number(numero).isValid;
  const isDateValid = valid.expirationDate(validade).isValid;
  const isCvvValid = valid.cvv(cvv).isValid;

  return isNameValid && isNumberValid && isDateValid && isCvvValid;
};

export const PaymentService = {
  verifyPaymentDetails,
};
