import express, { Router } from 'express';
import fetch from 'node-fetch';
import { createClient } from 'redis';

import { CryptoController, CryptoOption } from './controllers';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3001;

let redisClient: any;

(async () => {
  redisClient = createClient();
  redisClient.on('error', (error: any) => console.error(`Error : ${error}`));
  await redisClient.connect();
})();

const app = express();
const CryptoRouter = Router();

app.use('/api', CryptoRouter);

CryptoRouter.get('/:symbol', async (req, res) => {
  const symbol =
    typeof req.params.symbol === 'undefined' ? 'bitcoin' : req.params.symbol;
  const minutes =
    typeof req.query.minutes === 'undefined' ? 60 : req.query.minutes;

  const result = await CryptoController.browse({
    symbol,
    minutes,
  } as CryptoOption);

  await redisClient.set(symbol, JSON.stringify(result));

  res.send(result);
});

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
