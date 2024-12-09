/**
 * @description 请添加组件描述
 * @author maicFir
 */
import React, { memo } from "react";



export type IconProps = {
    width: number | string;
    height: number | string;
    className: string;
    onClick: () => void
}

const LoadingIcon: React.FC<Partial<IconProps>> = (props) => {
  const { className = "", width = 200, height = 200 } = props;
  return (
      <div>loading...</div>
  );
};

export default memo(LoadingIcon);