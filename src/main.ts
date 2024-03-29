import type { App } from "vue";
import { createApp } from "vue";
import "@unocss/reset/normalize.css";
import "virtual:uno.css";
import APP from "./App.vue";
import { MountRouterToApp } from "./routers";
import { registerPermission } from "./plugins";

const app: App = createApp(APP);

// 路由挂载
MountRouterToApp(app).then();

// 获取用户信息后挂载权限组件相关
// 注册权限插件
const permissionCodeSet = ["xx"]; // 权限集合
registerPermission(app, { permissionCodeSet });
// 页面挂载
app.mount("#app");
