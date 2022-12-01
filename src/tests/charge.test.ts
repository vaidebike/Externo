import { createFakeCharge } from '../mocks/charge';

describe('createFakeCharge function', () => {
  const charge = createFakeCharge();

  test('should have all Charge properties', () => {
    expect([...Object.keys(charge)]).toStrictEqual([
      'id',
      'status',
      'horaFinalizacao',
      'horaSolicitacao',
      'valor',
      'ciclista',
    ]);
  });

  test('should have all Charge properties types correct', () => {
    expect(typeof charge.id).toBe('string');
    expect(['PENDENTE', 'PAGA', 'FALHA', 'CANCELADA', 'OCUPADA']).toContain(
      charge.status
    );
    expect(typeof charge.horaSolicitacao).toBe('string');
    expect(typeof charge.horaFinalizacao).toBe('string');
    expect(typeof charge.valor).toBe('number');
    expect(typeof charge.ciclista).toBe('string');
  });
});
