import { RouteRecordRaw } from "vue-router";
import Test from "@/views/test/index.vue";
import Test2 from "@/views/test/test2.vue";
import Test4 from "@/views/test/test4.vue";
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
      path: "/test/test2",
      name: "test2",
      meta: {
        code: "xx",
        menu: {
          label: "test2",
        },
      },
      component: Test2,
      children: [
        {
          path: "test4",
          name: "test4s",
          component: Test4,
          meta: {
            code: "xsx",
            menu: {
              label: "test4",
            },
          },
        },
      ],
    },
  ],
};
