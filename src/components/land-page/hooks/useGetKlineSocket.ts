import React, { useEffect, useState, useRef } from "react";
import { useWebSocket } from "ahooks";
// 币安币队websocket
import { BINANCE_URL_STREAM } from "@src/constants";

export enum ReadyState {
    Connecting = 0,
    Open = 1,
    Closing = 2,
    Closed = 3
  }
// 单个币对K线websocket
export const useGetSymbolKlineWebsocket = (wrapParams?: any) => {
  const { socketParams = { symbol: "btcusdt", interval: "1m" }, lastSocketParams = {} } = wrapParams;
  const [currentParams, setCurrentParams] = useState<{ interval: string; symbol: string }>(socketParams);

  // k线strame websocket
  const {
    readyState: kLineState,
    sendMessage: sendKLineMessage,
    latestMessage: kLineMessage,
    connect: kLineConnect
  } = useWebSocket(BINANCE_URL_STREAM, {
    onError: err => {
      console.log(err, "kLineConnect");
    }
  });
  // kline线
  useEffect(() => {
    if (socketParams) {
      setCurrentParams(socketParams);
    }
  }, [socketParams?.symbol, socketParams?.interval]);
  // 订阅币安现货K线,websocket获取交易队信息
  useEffect(() => {
    if (!lastSocketParams) {
      return;
    }
    // 如果币对与时间不一样先取消上次币对的订阅
    if (lastSocketParams.current?.symbol && lastSocketParams.current.symbol !== socketParams.symbol) {
      sendKLineMessage?.(
        JSON.stringify({
          method: "UNSUBSCRIBE",
          params: [`${lastSocketParams.current.symbol?.toLowerCase()}@kline_${lastSocketParams.current?.interval}`],
          id: 312
        })
      );
    }
    if (lastSocketParams.current?.interval && lastSocketParams.current.interval !== socketParams.interval) {
      sendKLineMessage?.(
        JSON.stringify({
          method: "UNSUBSCRIBE",
          params: [`${lastSocketParams.current.symbol?.toLowerCase()}@kline_${lastSocketParams.current?.interval}`],
          id: 312
        })
      );
    }

    // 再订阅新的
    if (sendKLineMessage && kLineState === ReadyState.Open && socketParams.symbol) {
      sendKLineMessage?.(
        JSON.stringify({
          method: "SUBSCRIBE",
          params: [`${socketParams.symbol?.toLowerCase()}@kline_${socketParams.interval}`],
          id: 1
        })
      );
    }
  }, [kLineState, sendKLineMessage, socketParams.symbol, socketParams.interval]);

  return {
    kLineMessage
  };
};

// 所有k线websocket 
export const useGetAllBinanceKlineSocket = () => {
  // 币安symbol精简Ticker websocket
  const {
    readyState: binanceState,
    sendMessage: sendBinanceMessage,
    latestMessage: binanceMessage,
    connect: binanceConnect
  } = useWebSocket(BINANCE_URL_STREAM, {
    onError: err => {
      console.log(err, "err");
    }
  });
  // 订阅币安所有精简Ticker,websocket,获取交易队信息
  useEffect(() => {
    // ?streams=!miniTicker@arr subscribe
    if (sendBinanceMessage && binanceState === ReadyState.Open) {
      sendBinanceMessage(
        JSON.stringify({
          method: "SUBSCRIBE",
          params: ["!miniTicker@arr"],
          id: 1
        })
      );
    }
  }, [binanceState, sendBinanceMessage]);
  return {
    binanceMessage
  };
};