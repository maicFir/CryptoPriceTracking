/**
 * @description 请添加组件描述
 * @author maicFir
 */
import React, { memo, useRef, useEffect, useState } from "react";
import {
    init,
    dispose,
    LineType,
    LayoutChildType,
    OverlayMode,
    Chart,
    OverlayCreate
} from "klinecharts";
import { usePrevious } from "ahooks";
import { getSymbolKlineHistoryData } from "@src/services/api";
import {
    generateRandomString,
    convertToNumber,
} from "@src/utils";

import { useGetSymbolKlineWebsocket } from "@comp/land-page/hooks";
import Loading from "@comp/global/base-loading";
import { useLandPageStore } from "@store/index";
import PeriodBar from "./period-bar";
import DrawingBar from "./drawing-bar";
import { chartConfigOptions, periodsOptions, RESOLUTION } from "./chart.config";

import { ethKlineData} from "./mockData";
import { computedTimeForm } from "./util"
import style from "./chart.module.scss";
import { TextTimeType } from "./types";
interface Props { }

const ChartMain: React.FC<Props> = (props) => {
    const { } = props;
    const { symbol } = useLandPageStore();
    const defaultCondation = {
        limit: 1000,
        symbol: symbol,
        interval: "1s"
    }
    const [loading, setLoading] = useState(true);
    const [klineData, setKlineData] = useState<any[]>([]);
    const [currentKlineSocketData, setCurrentKlineSocketData] = useState({});
    const [socketParams, setSocketParams] = useState({
        ...defaultCondation
    });
    const lastSocketParams = usePrevious(socketParams);
    const { kLineMessage } = useGetSymbolKlineWebsocket({
        socketParams,
        lastSocketParams,
    });
    const chartElem = useRef<any>(null);
    const widget = useRef<Chart>(null);

   
    const [period, setPeriod] = useState({
        multiplier: 1,
        timespan: "minute",
        text: "5m",
    });

    const [periods, setPeriods] = useState(periodsOptions);

    useEffect(() => {
        widget.current = init(chartElem.current, chartConfigOptions);

        console.log(klineData, '====klineData2')

   
        let chartData = klineData.map((item: any) => {
            // const { close, high, low, open, time, volume } = v;
            const time = item[0];
            const open = item[1];
            const close = item[3];
            const low = item[4];
            const high = item[2];
            const volume = item[5];
          return {
            close: Number(close),
            high: Number(high),
            low: Number(low),
            open: Number(open),
            volume: Number(volume),
            timestamp: Number(time),
          };
        });
        console.log(chartData, '===chartData3');
  

        // const data2 = genData();
        (widget as any).current.applyNewData(chartData);
       
        //设置价格和数量精度
        // (widget as any).current.setPriceVolumePrecision(1,1);
        // 添加volum
        (widget as any).current.createIndicator(
            "VOL",
            false,
            {
                id: "pane_1",
                height: 80,
                minHeight: 30,
                dragEnabled: true,
                gap: { top: 0.2, bottom: 0.1 },
                axisOptions: { scrollZoomEnabled: true },
            },
            () => { }
        );

        return () => {
            dispose(chartElem.current);
        };
    }, [klineData]);

    useEffect(() => {
        if (Object.keys(currentKlineSocketData).length > 0) {
            const currentData = convertToNumber(
                currentKlineSocketData,
                ["close", "high", "low", "open", "timestamp", "volume"],
                true
            );
            (widget as any).current.updateData(currentData);
        }
    }, [currentKlineSocketData]);

    useEffect(() => {
        if (symbol) {
            setSocketParams({
                ...socketParams,
                symbol: symbol,
            });
        }
    }, [symbol]);
    useEffect(() => {
        getCurrentKlineSymbolPrice();
    }, [period.text, socketParams?.symbol]);

    useEffect(() => {
        if (kLineMessage?.data) {
            try {
                const socketData = JSON.parse(kLineMessage?.data);
                const data = socketData?.data;
                const channel = socketData.channel;
                console.log(data);
                if (channel === "token_kline") {
                    setCurrentKlineSocketData(data[0]);
                }
            } catch (error) { }
            console.log(kLineMessage?.data, "kLineMessage");
        }
        console.log(kLineMessage);
    
    }, [kLineMessage?.data, socketParams.symbol]);

  

    const getCurrentKlineSymbolPrice = async (currentParams: API.SymbolKline = socketParams) => {
        setLoading(true);
        if (!socketParams.symbol) {
            setLoading(false);
            return;
        }
    
        try {
            const res = await getSymbolKlineHistoryData(currentParams);
      
            console.log(res, "data-line");
            // setKlineData(ethKlineData.data)
            setKlineData(res);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };
    const handleDrawingItemClick = (overlay: any) => {
        widget.current?.createOverlay(overlay);
    };
    const handleModeChange = (mode: any) => {
        widget.current?.overrideOverlay({ mode: mode as OverlayMode });
    };
    const handleLockChange = (lock: any) => {
        widget.current?.overrideOverlay({ lock });
    };
    const handleVisibleChange = (visible: boolean) => {
        widget.current?.overrideOverlay({ visible });
    };
    const handleRemoveClick = (groupId: string) => {
        widget.current?.removeOverlay({ groupId });
    };
    const handleSetPeriod = (val: any) => {
        if (!socketParams.symbol) {
            return;
        }
        setPeriod(val);
        const resolution = RESOLUTION[val.text] || "1s";
        const params = {
            ...socketParams,
            interval: resolution
        };
        setSocketParams(params);
    };

    return (
        <div className={style["app"]}>
            <PeriodBar
                periods={periods}
                period={period}
                onPeriodChange={handleSetPeriod}
            />
            {/* <DrawingBar
                locale={"en-US"}
                onDrawingItemClick={handleDrawingItemClick}
                onModeChange={handleModeChange}
                onLockChange={handleLockChange}
                onVisibleChange={handleVisibleChange}
                onRemoveClick={handleRemoveClick}
            /> */}
            {loading && <Loading />}

            <div ref={chartElem} className={ style["symbol-chart"]}></div>
        </div>
    );
};

export default memo(ChartMain);
