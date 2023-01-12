import { CHARGE_STATUSES } from '@models/charge';

export const isValidNewCharge = (ciclista: string, valor: number) =>
  ciclista.length > 0 && valor >= 0;

export const isValidChargeStatus = (status: string) =>
  CHARGE_STATUSES.includes(status);
