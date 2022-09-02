import { defineConfig, mergeConfig } from "vite";
import baseConfig from "./config/vite/base";
export default defineConfig(async ({ command }) => {
  let config = null;
  if (command === "serve") {
    const fetchServeConfig = () => import("./config/vite/serve.js");
    config = await fetchServeConfig();
  } else {
    const fetchBuildConfig = () => import("./config/vite/build.js");
    config = await fetchBuildConfig();
  }
  return mergeConfig(baseConfig, {
    ...config.default,
  });
});
