import { visualizer } from "rollup-plugin-visualizer";
import { type PluginOption } from "vite";
export default function visualizerPlugin() {
  return visualizer({
    filename: "./node_modules/.cache/visualizer/stats.html",
    open: true,
  }) as PluginOption;
}
