import express from 'express';
import {
  addToChargeQueue,
  createCharge,
  getChargeById,
  listCharges,
  updateChargeStatus,
} from '../controllers/charge.controller';

const charges = express.Router();

charges.get('/cobranca', listCharges);
charges.get('/cobranca/:id', getChargeById);
charges.patch('/cobranca/:id', updateChargeStatus);
charges.post('/filaCobranca', addToChargeQueue);
charges.post('/cobranca', createCharge);

export default charges;
