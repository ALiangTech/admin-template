import vue from "@vitejs/plugin-vue";
import autoprefixer from "autoprefixer";
import postcssNesting from "postcss-nesting";
import Unocss from "unocss/vite";
import { createHtmlPlugin } from "vite-plugin-html";
import { UserConfig } from "vite";

// 通用配置 开发和生产 都需要的配置
const config: UserConfig = {
  plugins: [
    vue(),
    Unocss(),
    createHtmlPlugin({
      inject: {
        data: {
          title: "yiye-admin-core",
        },
      },
    }),
  ],
  envDir: "./../env",
  css: {
    postcss: {
      plugins: [autoprefixer, postcssNesting],
    },
  },
};

export default config;
