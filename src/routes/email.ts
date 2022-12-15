import express from 'express';
import { sendEmail } from '../controllers/email';

const emails = express.Router();

emails.post('/enviarEmail', sendEmail);

export default emails;
