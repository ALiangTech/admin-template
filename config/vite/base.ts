import vue from "@vitejs/plugin-vue";
import autoprefixer from "autoprefixer";
import postcssNesting from "postcss-nesting";
import Unocss from "unocss/vite";
import type { UserConfigExport } from "vite";
import mpa from "vite-plugin-mpa-plus";
// @ts-ignore
import vueJsx from "@vitejs/plugin-vue-jsx";
import path from "path";
import { createAutoImport, createAutoImportComponents } from './plugins/naiveui';
// 通用配置 开发和生产 都需要的配置
const config: UserConfigExport = {
  plugins: [
    vue(),
    Unocss({ configFile: "./../../uno.config.ts" }),
    vueJsx(),
    mpa({
      pages: {
        main: {
          entry: "src/main.ts",
          filename: "index.html",
          template: "./index.html",
          inject: {
            data: {
              title: "admin-naive",
            },
          },
        },
        login: {
          entry: "src/views/login/login.ts",
          filename: "login.html",
          template: "src/views/login/index.html",
          inject: {
            data: {
              title: "admin-naive-login",
            },
          },
        },
      },
    }),
    createAutoImport(),
    createAutoImportComponents(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./../../src"),
    },
  },
  envDir: "./config/env",
  css: {
    postcss: {
      plugins: [autoprefixer(), postcssNesting()],
    },
  },
};

export default config;
