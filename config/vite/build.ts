import type { UserConfigExport } from "vite";
import visualizerPlugin from "./plugins/visualizer";
const config: UserConfigExport = {
  plugins: [visualizerPlugin()],
};

export default config;
