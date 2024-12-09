/**
 * @description symbol头像组件，如果没有url，则显示币队名称
 * @author maicFir
 */
import React, { memo } from "react";
import { Typography } from "@mui/material";
import styleApp from "./index.module.scss";
interface Props {
  symbol: string;
  iconSize: {
    width: number;
    height: number;
  };
  iconUrl: string;
  style?: object;
  className?: string;
}

const Index: React.FC<Props> = (props) => {
  const { iconSize, style = {}, className, iconUrl, symbol } = props;
  // 假设图片url加载异常情况
  const onError = (e) => {
    const placeholder = document.createElement("div");
    placeholder.className = "img-error";
    placeholder.innerText = symbol;
    // 替换图片元素
    e.parentNode.replaceChild(placeholder, e);
  };
  return (
    <Typography
      component={"div"}
      className={`${styleApp["app"]} ${className}`}
      style={{ ...style }}
    >
      {iconUrl ? (
        <img
          src={iconUrl}
          width={iconSize.width}
          height={iconSize.height}
          alt={symbol}
          onError={onError}
        />
      ) : (
        <span>${symbol}</span>
      )}
    </Typography>
  );
};

export default memo(Index);
