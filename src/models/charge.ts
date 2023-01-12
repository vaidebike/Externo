export type Charge = {
  id: string;
  status: ChargeStatus;
  horaSolicitacao: string;
  horaFinalizacao: string | null;
  valor: number;
  ciclista: string;
};

export type ChargeStatus =
  | 'PENDENTE'
  | 'PAGA'
  | 'FALHA'
  | 'CANCELADA'
  | 'OCUPADA';

export const CHARGE_STATUSES = [
  'PENDENTE',
  'PAGA',
  'FALHA',
  'CANCELADA',
  'OCUPADA',
];
