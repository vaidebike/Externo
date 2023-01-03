import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import charges from './routes/charge';
import emails from './routes/email';
import payments from './routes/payment';

const app = express();
app.disable('x-powered-by');

app.use(express.json());

app.use('/', charges);
app.use('/', emails);
app.use('/', payments);

export default app;
