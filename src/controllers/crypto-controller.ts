import { CryptoService } from '../services';

export interface Symbols {
  symbol: 'bitcoin' | 'ethereum' | 'dogecoin';
}

export interface CryptoOption {
  minutes?: number;
  symbol: 'bitcoin' | 'ethereum' | 'dogecoin';
}

export class CryptoController {
  public CryptoService: CryptoService;
  constructor() {
    this.CryptoService = CryptoService;
  }

  // fetch all prices in EUR of the cryptocurrencies Bitcoin, Ethereum and Dogecoin
  public static async browse(options: CryptoOption) {
    try {
      const result = await CryptoService.browse(options);
      return result;
    } catch (error) {
      console.error(error);
    }
  }
}
