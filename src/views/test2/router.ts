import { RouteRecordRaw } from "vue-router";
import Test from "@/views/test2/index.vue";
export const login: RouteRecordRaw = {
  path: "/test3",
  name: "test3",
  meta: {
    code: "xx",
    menu: {
      label: "test3",
    },
  },
  component: Test,
};
