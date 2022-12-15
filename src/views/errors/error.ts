export type ErrorTemplate = {
  id?: string;
  message: string;
  status: number;
};

const notFoundError = {
  message: 'Não Encontrado',
  status: 404,
};

const invalidDataError = {
  message: 'Dados Inválidos',
  status: 422,
};

const serverError = {
  message: 'Erro no Servidor',
  status: 500,
};

export const errors = {
  notFoundError,
  invalidDataError,
  serverError,
};
