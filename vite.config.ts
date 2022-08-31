import { defineConfig, mergeConfig } from "vite";
import baseConfig from "./config/vite/base";
export default defineConfig(async ({ command }) => {
  const fetchDevConfig = () => import(`./config/vite/${command}`);
  const config = await fetchDevConfig();
  return mergeConfig(baseConfig, {
    ...config.default,
  });
});
