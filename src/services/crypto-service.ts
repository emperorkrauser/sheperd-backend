import { CryptoOption, Symbols } from '../controllers';
import { CryptoRepository } from '../repositories';

function getRepository() {
  return new CryptoRepository();
}

export class CryptoService {
  public static async browse(options: CryptoOption) {
    try {
      const result = await getRepository().browse(options);
      return result;
    } catch (error) {
      console.error(error);
    }
  }
}
