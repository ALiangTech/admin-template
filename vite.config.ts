import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import autoprefixer from "autoprefixer";
import postcssNesting from "postcss-nesting";
import Unocss from "unocss/vite";
import { createHtmlPlugin } from "vite-plugin-html";

// https://vitejs.dev/config/
export default defineConfig({
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
  server: {
    host: true,
  },
  css: {
    postcss: {
      plugins: [autoprefixer, postcssNesting],
    },
  },
});
