import {
  createRouter,
  createWebHistory,
  RouterOptions,
  RouteRecordRaw,
  NavigationGuard,
} from "vue-router";
import { App } from "vue";
// 批量导入static 文件下的路由文件
type batchModules = Record<string, Record<string, RouteRecordRaw>>;
const staticModules: batchModules = import.meta.glob("./modules/static/*.ts", {
  eager: true,
});
// 从批量导入路由模块中获取 路由模块数据
const getRouterFromModules = (modules: batchModules) => {
  const routesModule = Object.values(modules);
  const routers = Object.values(routesModule);
  return routers.map((item) => {
    const [module] = Object.values(item);
    return module;
  });
};
const staticRoutes = getRouterFromModules(staticModules);

const routes: RouteRecordRaw[] = [...staticRoutes];

const options: RouterOptions = {
  history: createWebHistory(),
  routes,
};
const router = createRouter(options);

// 挂载到实例上面

export const MountRouterToApp = (app: App) => {
  app.use(router);
  return router.isReady();
};

// 添加导航前的守卫
export const addRouterGuard = (callback: NavigationGuard) => {
  router.beforeEach(callback);
};
