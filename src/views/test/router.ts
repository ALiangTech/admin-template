import { RouteRecordRaw } from "vue-router";
import Test from "@/views/test/index.vue";
import Test2 from "@/views/test2/index.vue";
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
      path: "test2",
      name: "test2",
      meta: {
        code: "xx",
        menu: {
          label: "test2",
        },
      },
      component: Test2,
    },
  ],
};
