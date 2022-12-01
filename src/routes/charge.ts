import express from 'express';
import { getCharge, listCharges } from '../controllers/charge';

const charges = express.Router();

charges.get('/', listCharges);
charges.get('/:id', getCharge);

export default charges;
