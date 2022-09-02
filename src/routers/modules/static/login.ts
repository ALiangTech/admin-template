import { RouteRecordRaw } from "vue-router";
import Login from "@/pages/login/index.vue";
export const login: RouteRecordRaw = {
  path: "/login",
  name: "login",
  component: Login,
};
