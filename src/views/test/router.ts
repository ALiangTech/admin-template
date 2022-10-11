import { RouteRecordRaw } from "vue-router";
import Test from "@/views/test/index.vue";
export const login: RouteRecordRaw = {
  path: "/test",
  name: "test",
  meta: {
    code: "xx",
    menu: {
      label: "test1",
    },
  },
  component: Test,
  children: [
    {
      path: "",
      name: "test3",
      meta: {
        code: "xx",
        menu: {
          label: "test3",
        },
      },
      component: Test,
    },
  ],
};
