import express from 'express';
import { sendEmail } from '../controllers/email';

const emails = express.Router();

emails.post('/send-email', sendEmail);

export default emails;
