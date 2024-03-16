import { CryptoService } from '../services';
export class CryptoController {
    constructor() {
        this.CryptoService = CryptoService;
    }
    // fetch all prices in EUR of the cryptocurrencies Bitcoin, Ethereum and Dogecoin
    static async browse(options) {
        try {
            const result = await CryptoService.browse(options);
            return result;
        }
        catch (error) {
            console.error(error);
        }
    }
}
