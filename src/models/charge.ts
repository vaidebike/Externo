export type Charge = {
  id: string;
  status: ChargeStatus;
  horaSolicitacao: string;
  horaFinalizacao: string;
  valor: number;
  ciclista: string;
};

export type ChargeStatus =
  | 'PENDENTE'
  | 'PAGA'
  | 'FALHA'
  | 'CANCELADA'
  | 'OCUPADA';
