import type { UserConfigExport } from "vite";
import visualizerPlugin from "./plugins/visualizer";
const config: UserConfigExport = {
  plugins: [visualizerPlugin()],
  base: '/admin-template/', // 为了在github page部署设置的
};

export default config;
