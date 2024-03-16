import { CryptoRepository } from '../repositories';

function getRepository() {
  return new CryptoRepository();
}

export class CryptoService {
  public static async browse() {
    try {
      const result = await getRepository().browse();
      return result;
    } catch (error) {
      console.error(error);
    }
  }
}
