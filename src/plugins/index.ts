import { App } from "vue";
import { permission } from "./permissions/index";
import { Options } from "./permissions/types";

export { permission };
// 注册权限插件函数
export const registerPermissionToApp = (app: App, options: Options) => {
  app.use(permission, options);
};
