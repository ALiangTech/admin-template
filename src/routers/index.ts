import {
  createRouter,
  createWebHistory,
  RouterOptions,
  RouteRecordRaw,
} from "vue-router";
import { App, ref } from "vue";
import {createMenuData,filterPermissionRoutes,findFirstPermissionRoute, Menu} from '@/routers/core'
// 批量导入src router.ts 文件下的路由文件
type batchModules = Record<string, Record<string, RouteRecordRaw>>;
const asyncModules: batchModules = import.meta.glob("./../**/router.ts", {
  eager: true,
});
// 从批量导入路由模块中获取 路由模块数据
const getRoutes = (modules: batchModules) => {
  const routesModule = Object.values(modules);
  const routers = Object.values(routesModule);
  return routers.map((item) => {
    const [module] = Object.values(item);
    return module;
  });
};
export const asyncRoutes = getRoutes(asyncModules);

export const menu = ref<Menu[]>([]);
export const firstPermissionRoute = ref<RouteRecordRaw>();
// 无权限页面 
// 当通过url进入 无权限 就跳转无权限页面
const noPermissionRoute: RouteRecordRaw = {
  path: "/:pathMatch(.*)*",
  name: "NoPermission",
  component: () => import("./exceptional/no-permission.vue"),
};
const rootRoute: RouteRecordRaw = {
  path: "/",
  name: "RootPage",
  component: () => import("./components/root/root.vue"),
  children: [],
};
// 挂载到实例上面
export const MountRouterToApp = async (app: App) => {
  const hasPermissionRoutes = filterPermissionRoutes({
    codes: ["xx"],
    routes: asyncRoutes,
  });
  firstPermissionRoute.value = findFirstPermissionRoute({
    routes: hasPermissionRoutes,
  });
  menu.value = createMenuData({ routes: hasPermissionRoutes });
  rootRoute.children = hasPermissionRoutes;
  const options: RouterOptions = {
    history: createWebHistory(),
    routes: [rootRoute, noPermissionRoute],
    strict: true,
    sensitive: true,
  };
  const router = createRouter(options);
  app.use(router);
  await router.isReady();
  return { router };
};
