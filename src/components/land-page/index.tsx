/**
 * @description 首页
 * @author maicFir
 */
import React, { memo } from "react";
import { Box } from "@mui/material"
import Kline from "./component/kline";
import Condation from "./component/condation";
import style from "./index.module.scss"
interface Props {}

const Index: React.FC<Props> = props => {
  const {} = props;
    return <Box className={ style["app"]}>
        <Condation />
        <Kline />
  </Box>;
};

export default memo(Index);
