import vue from "@vitejs/plugin-vue";
import autoprefixer from "autoprefixer";
import postcssNesting from "postcss-nesting";
import Unocss from "unocss/vite";
import { createHtmlPlugin } from "vite-plugin-html";
import { UserConfigExport } from "vite";
import path from "path";
// 通用配置 开发和生产 都需要的配置
const config: UserConfigExport = {
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
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./../../src"),
    },
  },
  envDir: "./../env",
  css: {
    postcss: {
      plugins: [autoprefixer, postcssNesting],
    },
  },
};

export default config;
