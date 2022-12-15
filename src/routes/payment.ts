import express from 'express';
import { validatePaymentDetails } from '../controllers/payment';

const payments = express.Router();

payments.post('/validaCartaoDeCredito', validatePaymentDetails);

export default payments;
