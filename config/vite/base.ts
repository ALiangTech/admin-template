import vue from "@vitejs/plugin-vue";
import autoprefixer from "autoprefixer";
import postcssNesting from "postcss-nesting";
import Unocss from "unocss/vite";
import { UserConfigExport } from "vite";
import mpa from "vite-plugin-mpa-plus";
// @ts-ignore
import vueJsx from "@vitejs/plugin-vue-jsx";
import path from "path";
// 通用配置 开发和生产 都需要的配置
const config: UserConfigExport = {
  plugins: [
    vue(),
    Unocss(),
    vueJsx(),
    mpa({
      pages: {
        main: {
          entry: "src/main.ts",
          filename: "index.html",
          template: "index.html",
          inject: {
            data: {
              title: "yiye-admin-core",
            },
          },
        },
        login: {
          entry: "login/login.ts",
          filename: "login/index.html",
          template: "login/index.html",
          inject: {
            data: {
              title: "yiye-admin-core-login",
            },
          },
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
