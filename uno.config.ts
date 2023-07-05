// uno.config.ts
import {
  UserConfig,
  defineConfig,
  presetAttributify,
  presetWebFonts,
  presetWind,
} from "unocss";

const config: UserConfig<any> = defineConfig({
  presets: [presetWind(), presetAttributify(), presetWebFonts()],
});

export default config;
