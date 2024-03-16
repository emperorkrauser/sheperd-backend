import { CryptoService } from '../services';

export interface Symbols {
  symbol: 'bitcoin' | 'ethereum' | 'dogecoin';
}

export interface CryptoOption {
  minutes?: number;
  symbol: Symbols['symbol'];
}

export class CryptoController {
  public CryptoService: CryptoService;
  constructor() {
    this.CryptoService = CryptoService;
  }

  public static async browse(options: CryptoOption) {
    try {
      const result = await CryptoService.browse(options);
      return result;
    } catch (error) {
      console.error(error);
    }
  }
}
