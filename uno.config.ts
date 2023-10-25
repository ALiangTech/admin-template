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
    absoluteCenter: 'absolute left-50% top-50% translate--50%', // 相对定位居中
    flexCenter: 'flex justify-center items-center' // flex 居中
  },
  transformers: [
    transformerAttributifyJsx(), // <--
  ],
  theme: {
    colors: {
      'lime-1': '#fcffe6',
      'lime-2': '#f4ffb8',
      'lime-3': '#eaff8f',
      'lime-4': '#d3f261',
      'lime-5': '#bae637',
      'lime-6': '#a0d911',
      'lime-7': '#7cb305',
      'lime-8': '#5b8c00',
      'lime-9': '#3f6600',
      'lime-10': '#254000',
      'gray-1': '#ffffff',
      'gray-2': '#fafafa',
      'gray-3': '#f5f5f5',
      'gray-4': '#f0f0f0',
      'gray-5': '#d9d9d9',
      'gray-6': '#bfbfbf',
      'gray-7': '#8c8c8c',
      'gray-8': '#595959',
      'gray-9': '#434343',
      'gray-10': '#262626',
      'gray-11': '#1f1f1f',
      'gray-12': '#141414',
      'title': '#000000E0', // 标题
      'primary': '#000000E0', // 一级文本
      'second': '#000000A6', // 二级文本
      'disabled': '#00000040', // 禁用文本
      'primaryLayout': '#F5F5F5FF'
    }
  },
  rules: [
    [/^circle-(\d+)$/, ([, d]) => ({ 'clip-path': `circle(${d}%)` })],
    [
      /^text-c-(.*)$/,
      ([, c], { theme }) => {
        if (theme.colors[c]) return { color: theme.colors[c] }
      }
    ],
    [
      /^bg-c-(.*)$/,
      ([, c], { theme }) => {
        if (theme.colors[c]) return { 'background-color': theme.colors[c] }
      }
    ]
  ]
});

export default config;
