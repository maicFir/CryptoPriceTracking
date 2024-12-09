/**
 * @description 请添加组件描述
 * @author maicFir
 */
import React, { memo } from "react";
import { Typography } from "@mui/material";
import { BaseSymbolAvatar } from "@comp/global";
import { useLandPageStore } from "@store/index";
import style from "./index.module.scss";
interface Period {
  multiplier: number;
  timespan: string;
  text: string;
}
interface Props {
  periods: Period[];
  period: Period;
  onPeriodChange: (period: Period) => void;
}

const PeriodBar: React.FC<Props> = (props) => {
  const { periods, period } = props;
    const { symbol} = useLandPageStore();
  return (
    <Typography component={"div"} className={`${style["app"]}`}>
      <div className="symbol-img">
        <BaseSymbolAvatar
          iconSize={{ width: 45, height: 45 }}
          symbol={symbol}
          iconUrl={""}
          className="symbol-icon-wrap"
        />
      </div>
      {periods.map((p) => (
        <span
              className={`item period ${p.text === period.text ? "selected" : ""}`}
              key={ p.text}
          onClick={() => {
            props.onPeriodChange(p);
          }}
        >
          {p.text}
        </span>
      ))}
    </Typography>
  );
};

export default memo(PeriodBar);
