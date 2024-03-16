import express, { Router } from 'express';
import { CryptoController, CryptoOption } from './controllers';
import dotenv from 'dotenv';
import { error } from 'console';
dotenv.config();

const PORT = process.env.PORT || 3001;
const app = express();
const CryptoRouter = Router();

app.use('/api', CryptoRouter);

app.get('/:symbol', async (req, res) => {
  const { symbol = 'bitcoin', minutes = 60 } =
    req.params as unknown as CryptoOption;
  const cryptoparams = {
    symbol,
    minutes,
  };
  const result = await CryptoController.browse(cryptoparams);
  res.send(result);
});

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
