import { Plugin, App } from "vue";
import HasPermission from "./HasPermission.vue";
import { RouteLocationNormalized, Router } from "vue-router";
interface Options {
  permissionCodeSet: string[];
  router: Router;
  [key: string]: any;
}
type PluginInstallFunction = (app: App, ...options: Options[]) => any;
const install: PluginInstallFunction = (app, ...options) => {
  const { permissionCodeSet, router } = options[0];
  console.log(permissionCodeSet, "plugin");
  // 全局权限组件
  app.component("HasPermissionControl", {
    extends: HasPermission,
    props: {
      permissionCodeSet: {
        type: Array,
        default: () => permissionCodeSet,
      },
    },
  });
  // 路由拦截
  router &&
    router.beforeEach((to: RouteLocationNormalized) => {
      const { code } = to.meta;
      if (code) {
        // 有code 必须判断权限
        const hasPermission = permissionCodeSet.includes(code as string);
        if (hasPermission) {
          return hasPermission;
        } else {
          window.alert("暂无访问权限");
          return !hasPermission;
        }
      }
      return true;
    });
};
export const permission: Plugin = {
  install,
};
