import { ChargeService } from '@services/charge.service';
import cron from 'node-cron';

import app from './app';

const port = 3333;

app.listen(port, () => console.log(`Running on port ${port}`));

cron.schedule('* * * * *', () => {
  ChargeService.processChargeQueue();
});
