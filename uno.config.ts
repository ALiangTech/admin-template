// uno.config.ts
import {
  UserConfig,
  defineConfig,
  presetAttributify,
  presetWebFonts,
} from "unocss";
import presetWind from "@unocss/preset-wind";

const config: UserConfig<any> = defineConfig({
  presets: [presetWind(), presetAttributify(), presetWebFonts()],
});

export default config;
