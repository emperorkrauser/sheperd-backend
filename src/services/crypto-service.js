import { CryptoRepository } from '../repositories';
function getRepository() {
    return new CryptoRepository();
}
export class CryptoService {
    static async browse(options) {
        try {
            const result = await getRepository().browse(options);
            return result;
        }
        catch (error) {
            console.error(error);
        }
    }
}
