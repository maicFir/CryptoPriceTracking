/**
 * @description 请添加组件描述
 * @author maicFir
 */
"use client";
import React, {memo} from "react";
import Kline from "./Chart"
interface Props {}

const Index: React.FC<Props> = props => {
  const {} = props;
  return <Kline />;
};

export default memo(Index);
