import { RouteRecordRaw } from "vue-router";
import Test from "@/pages/test/index.vue";
export const login: RouteRecordRaw = {
  path: "/test",
  name: "test",
  meta: {
    code: "xxe",
  },
  component: Test,
};
