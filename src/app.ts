import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import charges from './routes/charge.routes';
import emails from './routes/email.routes';
import payments from './routes/payment.routes';

const app = express();
app.disable('x-powered-by');

app.use(express.json());

app.use('/', charges);
app.use('/', emails);
app.use('/', payments);

export default app;
