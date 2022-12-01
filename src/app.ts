import express from 'express';
import charges from './routes/charge';

const app = express();
app.disable('x-powered-by');

const port = 4001;

app.get('/', (_, res) => {
  res.status(200).send();
});

app.use('/charges', charges);

app.listen(port, () => console.log(`Running on port ${port}`));
