// uno.config.ts
import type {
  UserConfig
} from "unocss";
import {
  defineConfig,
  presetAttributify,
  presetWebFonts,
  presetWind,
} from "unocss";

const config: UserConfig<any> = defineConfig({
  presets: [presetWind(), presetAttributify(), presetWebFonts()],
});

export default config;
