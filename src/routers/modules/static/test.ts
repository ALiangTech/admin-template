import { RouteRecordRaw } from "vue-router";
import Test from "@/pages/test/test-page.vue";
export const login: RouteRecordRaw = {
  path: "/test",
  name: "test",
  meta: {
    code: "xxe",
  },
  component: Test,
};
