import express from 'express';
import {
  addToChargeQueue,
  createCharge,
  getChargeById,
  listChargeQueue,
  listCharges,
  processChargeQueue,
  updateChargeStatus,
} from '../controllers/charge.controller';

const charges = express.Router();

charges.get('/cobranca', listCharges);
charges.get('/filaCobranca', listChargeQueue);
charges.get('/cobranca/:id', getChargeById);
charges.patch('/cobranca/:id', updateChargeStatus);
charges.post('/filaCobranca', addToChargeQueue);
charges.post('/cobranca', createCharge);
charges.post('/processaCobrancasEmFila', processChargeQueue);

export default charges;
