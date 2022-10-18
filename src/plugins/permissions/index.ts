import { Plugin } from "vue";
import HasPermission from "./HasPermission.vue";
import { PluginInstallFunction } from "./types";
const install: PluginInstallFunction = (app, ...options) => {
  const { permissionCodeSet } = options[0];
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
};
export const permission: Plugin = {
  install,
};
