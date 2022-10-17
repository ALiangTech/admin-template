import {
  createRouter,
  createWebHistory,
  RouterOptions,
  RouteRecordRaw,
  NavigationGuard,
} from "vue-router";
import { App } from "vue";
import { initMenu } from "./components/menu/index";
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

const routes: RouteRecordRaw[] = [];
const options: RouterOptions = {
  history: createWebHistory(),
  routes,
  strict: true,
  sensitive: true,
};
export const router = createRouter(options);

// 挂载到实例上面

export const MountRouterToApp = (app: App) => {
  // menu init
  initMenu({ router });
  app.use(router);
  return router.isReady();
};

// 添加导航前的守卫

export const addRouterGuard = (callback: NavigationGuard) => {
  router.beforeEach(callback);
};
