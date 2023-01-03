import express from 'express';
import { createCharge, getChargeById } from '../controllers/charge';

const charges = express.Router();

charges.get('/cobranca/:id', getChargeById);
charges.post('/cobranca', createCharge);

export default charges;
