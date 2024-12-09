import { LineType, LayoutChildType } from "klinecharts";
export const chartConfigOptions = {
  styles: {
    grid: {
      show: true,
      horizontal: {
        show: true,
        size: 1,
        color: "#32353a",
        style: "solid" as LineType,
        dashedValue: [2, 2],
      },
      vertical: {
        show: true,
        size: 1,
        color: "#32353a",
        style: "solid" as LineType,
        dashedValue: [2, 2],
      },
    },

    xAxis: {
      show: true,
      axisLine: {
        show: true,
        color: "#32353a",
        size: 1,
      },
      tickLine: {
        show: true,
        size: 1,
        length: 3,
        color: "#32353a",
      },
    },
    yAxis: {
      show: true,
      axisLine: {
        show: true,
        color: "#32353a",
        size: 1,
      },
      tickLine: {
        show: true,
        size: 1,
        length: 3,
        color: "#32353a",
      },
    },
    candle: {
      priceMark: {
        show: false,
      },
    },
    separator: {
      color: "#32353a",
    },
  },
  layout: [
    {
      type: "candle" as LayoutChildType.Candle,
    },
  ],
};

export const periodsOptions = [
  { multiplier: 1, timespan: "second", text: "1s" },
  { multiplier: 1, timespan: "minute", text: "1m" },
  { multiplier: 5, timespan: "minute", text: "5m" },
  { multiplier: 15, timespan: "minute", text: "15m" },
  { multiplier: 1, timespan: "hour", text: "1H" },
  { multiplier: 2, timespan: "hour", text: "2H" },
  { multiplier: 4, timespan: "hour", text: "4H" },
  { multiplier: 1, timespan: "day", text: "D" },
  { multiplier: 1, timespan: "week", text: "W" },
  { multiplier: 1, timespan: "month", text: "M" },
  { multiplier: 1, timespan: "year", text: "Y" },
];

export const RESOLUTION: { [key: string]: string } = {
  "1s": "1s",
  "1m": "1m",
  "5m": "5m",
  "1H": "1h",
  "4H": "4h",
  D: "1d",
};
