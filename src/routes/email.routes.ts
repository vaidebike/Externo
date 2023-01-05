import express from 'express';
import { sendEmail } from '../controllers/email.controller';

const emails = express.Router();

emails.post('/enviarEmail', sendEmail);

export default emails;
