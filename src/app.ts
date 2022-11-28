import express from 'express';

const app = express();
app.disable('x-powered-by');

const port = 4001;

app.get('/', (_, res) => {
  res.status(200).send();
});

app.get('/test', (_, res) => {
  res.status(200).send({
    message: 'Hello World',
  });
});

app.listen(port, () => console.log(`Running on port ${port}`));
