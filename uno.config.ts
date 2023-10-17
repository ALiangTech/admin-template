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
import transformerAttributifyJsx from '@unocss/transformer-attributify-jsx'


const config: UserConfig<any> = defineConfig({
  presets: [presetWind(), presetAttributify(), presetWebFonts()],
  transformers: [
    transformerAttributifyJsx(), // <--
  ],
});

export default config;
