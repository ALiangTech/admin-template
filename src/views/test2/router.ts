import { RouteRecordRaw } from "vue-router";
import Test from "@/views/test2/index.vue";
export const login: RouteRecordRaw = {
  path: "/test2",
  name: "test2",
  meta: {
    code: "xx",
    menu: {
      label: "test2",
    },
  },
  component: Test,
};
