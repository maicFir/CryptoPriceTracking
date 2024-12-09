/**
 * @description 请添加组件描述
 * @author maicFir
 */
"use client";
import React, {memo, useEffect, useState} from "react";
import { Box, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useLandPageStore } from "@store/index"
import { getSymbolListApi } from "@src/services/api";
import style from "./index.module.scss";
interface Props {}

const Index: React.FC<Props> = props => {
    const { } = props;
    const { storeSymbol } = useLandPageStore();
    const [currentSymbol, setCurrentSymbol] = useState("ETHUSDT");
    const [symbolList, setSymbolList] = useState([]);

    const getSymbolList = async () => {
        const res = await getSymbolListApi();
        const { symbols } = res;
        setSymbolList(res.symbols);
        storeSymbol(symbols[0].symbol);
    }
    useEffect(() => {
        getSymbolList();
    }, [])
    const handleChange = (event: SelectChangeEvent) => {
        setCurrentSymbol(event.target.value as string);
        storeSymbol(event.target.value)
    }
    return <Box className={style["app"]}>
        {
            symbolList.length > 0 ? <Select
            value={currentSymbol}
            onChange={handleChange}
          >
              {
                  symbolList.map((v: any, index) => <MenuItem key={index} value={v.symbol}>{
                      v.symbol
                  }</MenuItem>)
            }
          
          </Select> : []
        }
        
  </Box>;
};

export default memo(Index);
