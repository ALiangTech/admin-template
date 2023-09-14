// uno.config.ts
import type {
  UserConfig
} from "unocss";
import {
  defineConfig,
  presetAttributify,
  presetWebFonts,
  presetWind,
  presetIcons,
} from "unocss";

const config: UserConfig<any> = defineConfig({
  presets: [presetWind(), presetAttributify(), presetWebFonts(), presetIcons({
    cdn: 'https://esm.sh/'
  })],
  shortcuts: {
    absoluteCenter: 'absolute left-50% top-50% translate--50%' // 相对定位居中
  }
});

export default config;
