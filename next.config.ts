import type { NextConfig } from "next";
import path from "path";
const nextConfig: NextConfig = {
    /* config options here */
    cssModules: true,
    sassOptions: {
      // 如果使用 SCSS，需要添加这个配置
      includePaths: [path.join(__dirname, 'styles')],
    },
};

export default nextConfig;
