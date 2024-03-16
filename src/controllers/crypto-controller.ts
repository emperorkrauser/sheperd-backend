import { CryptoService } from '../services';

export class CryptoController {
  public CryptoService: CryptoService;
  constructor() {
    this.CryptoService = CryptoService;
  }

  // fetch all prices in EUR of the cryptocurrencies Bitcoin, Ethereum and Dogecoin
  public static async browse() {
    try {
      const result = await CryptoService.browse();
      return result;
    } catch (error) {
      console.error(error);
    }
  }
}
