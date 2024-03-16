import { CryptoOption } from '../controllers';
import moment from 'moment';

const API_KEY = 'CG-kzPZVMV9pvBTiJYaDW356PTu';
export class CryptoRepository {
  public async browse(options: CryptoOption) {
    const { symbol, minutes } = options;
    let finalResult = {};

    // const latest = await this.getLatest(symbol);
    // const history = await this.getHistory(symbol);

    const promises = await Promise.all([
      await this.getLatest(symbol),
      await this.getHistory(symbol),
    ]);

    const latest = promises[0];
    const history = promises[1];

    const { current_price } = history;
    let sumOfPrices = 0;
    let count = 0;
    for (const key in current_price) {
      if (Object.prototype.hasOwnProperty.call(current_price, key)) {
        sumOfPrices += current_price[key];
        count++;
      }
    }

    return {
      ...finalResult,
      latest,
      average: sumOfPrices / count,
      history,
      count,
    };
  }

  public async getLatest(symbol: string) {
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${symbol}&vs_currencies=eur`;
    const options = {
      method: 'GET',
      headers: { 'x-cg-demo-api-key': API_KEY },
    };

    const result = await this.getApiResults(url, options);
    return result;
  }

  public async getHistory(symbol: string) {
    const unformattedDate = new Date('01-01-2020');
    const date = moment(unformattedDate).format('MM-DD-YYYY');
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

  public async getApiResults(
    url: string,
    options: { method: string; headers: { 'x-cg-demo-api-key': string } }
  ) {
    return await fetch(url, options)
      .then((res) => res.json())
      .then((json) => json)
      .catch((err) => console.error('error:' + err));
  }
}
