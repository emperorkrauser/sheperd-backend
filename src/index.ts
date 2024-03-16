import express, { Router } from 'express';
import { CryptoController } from './controllers';

const PORT = 3001;
const app = express();
const CryptoRouter = Router();

app.use('/api', CryptoRouter);

CryptoRouter.route('/').get(async (req, res) => {
  const result = await CryptoController.browse();
  res.send(result);
});

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
