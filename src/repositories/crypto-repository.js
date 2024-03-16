import moment from 'moment';
const API_KEY = 'CG-kzPZVMV9pvBTiJYaDW356PTu';
export class CryptoRepository {
    async browse(options) {
        const { symbol, minutes } = options;
        let finalResult = {};
        const result = await this.getLatest(symbol);
        console.log('browse result', result.api);
        const history = await this.getHistory(symbol);
        console.log('historyResult', history);
        return {
            ...finalResult,
            latest: result.api.eur,
            history,
        };
    }
    // repository to get the latest
    async getLatest(symbol) {
        const url = `https://api.coingecko.com/api/v3/simple/price?ids=${symbol}&vs_currencies=eur&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true&precision=full`;
        const options = {
            method: 'GET',
            headers: { 'x-cg-demo-api-key': API_KEY },
        };
        const result = await this.getApiResults(url, options);
        return result;
    }
    async getHistory(symbol) {
        const unformattedDate = Date.now();
        const date = moment('01-01-2020').format('MM-DD-YYYY');
        console.log('date', date);
        const url = `https://api.coingecko.com/api/v3/coins/${symbol}/history?date=${date}&localization=false";`;
        const options = {
            method: 'GET',
            headers: { 'x-cg-demo-api-key': API_KEY },
        };
        const result = await this.getApiResults(url, options);
        const { market_data } = result;
        const { current_price, market_cap, total_volume } = market_data;
        return {
            current_price,
            market_cap,
            total_volume,
        };
    }
    async getApiResults(url, options) {
        return await fetch(url, options)
            .then((res) => res.json())
            .then((json) => json)
            .catch((err) => console.error('error:' + err));
    }
}
