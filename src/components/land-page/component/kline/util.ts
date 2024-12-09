import dayjs from "dayjs";
export const computedTimeForm = (time, interval: TextTimeType) => {
    if (interval === "1s") {
      return dayjs(time).subtract(30, "second").valueOf();
    }
    if (interval === "1m") {
      return dayjs(time).subtract(5, "hour").valueOf();
    }
    if (interval === "5m") {
      return dayjs(time).subtract(14, "day").valueOf();
    }
    if (interval === "1H") {
      return dayjs(time).subtract(30, "day").valueOf();
    }
    if (interval === "4H") {
      return dayjs(time).subtract(120, "day").valueOf();
    }
    if (interval === "D") {
      return dayjs(time).subtract(1, "year").valueOf();
    }
    return dayjs(time).valueOf();
};
  
