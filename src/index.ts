import express, { Router } from 'express';
import { CryptoController, CryptoOption } from './controllers';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3001;
const app = express();
const CryptoRouter = Router();

app.use('/api', CryptoRouter);

CryptoRouter.get('/:symbol', async (req, res) => {
  // const { symbol = 'bitcoin', minutes } = req.params as unknown as CryptoOption;

  const symbol =
    typeof req.params.symbol === 'undefined' ? 'bitcoin' : req.params.symbol;
  const minutes =
    typeof req.query.minutes === 'undefined' ? 60 : req.query.minutes;

  const result = await CryptoController.browse({
    symbol,
    minutes,
  } as CryptoOption);
  res.send(result);
});

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
