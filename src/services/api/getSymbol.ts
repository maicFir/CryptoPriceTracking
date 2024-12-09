import { Api } from "@utils/api";
import { BINANCE_URL_KLINE } from "@/constants";
/**
 * @description 获取k线历史数据
 * @param params 
 * @returns 
 */
export const getSymbolKlineHistoryData = async (params: API.SymbolKline) => {
    const res = await Api(`${BINANCE_URL_KLINE}/api/v3/uiKlines`).get({
        params,
    });
 
      return res;
}


export const getSymbolListApi = async () => {
    const res = await Api("https://api.binance.com/api/v3/exchangeInfo").get();
    return res;
}
