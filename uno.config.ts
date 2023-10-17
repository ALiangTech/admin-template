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
import transformerAttributifyJsx from '@unocss/transformer-attributify-jsx'


const config: UserConfig<any> = defineConfig({
  presets: [presetWind(), presetAttributify(), presetWebFonts(), presetIcons({
    cdn: 'https://esm.sh/'
  })],
  shortcuts: {
    absoluteCenter: 'absolute left-50% top-50% translate--50%' // 相对定位居中
  },
  transformers: [
    transformerAttributifyJsx(), // <--
  ],
});

export default config;
