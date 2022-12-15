import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import emails from './routes/email';
import payments from './routes/payment';

const app = express();
app.disable('x-powered-by');

const port = 4001;

app.get('/', (_, res) => {
  res.status(200).send();
});

app.use(express.json());

app.use('/', emails);
app.use('/', payments);

app.listen(port, () => console.log(`Running on port ${port}`));
