/**
 * @description 请添加组件描述
 * @author maicFir
 */
import React, { memo } from "react";
import { DataEmpty } from "@comp/global";

import style from "./index.module.scss";

interface Props {
  className?: string;
  children?: React.ReactNode;
  style?: string;
  loading?: boolean;
  dataSource?: any[];
  renderItem?: (data: any) => React.ReactElement;
}

const Index: React.FC<Props> = (props) => {
  const {} = props;
  return (
    <ul className={style["app"]}>
      {!props.loading && !props.children && !props.dataSource?.length && (
        <DataEmpty />
      )}
      {props.children ? props.children : null}

      {!props.children &&
        props.dataSource?.map((data) => props.renderItem?.(data) ?? <li></li>)}
    </ul>
  );
};

export default memo(Index);
