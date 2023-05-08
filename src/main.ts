import { createApp, App } from "vue";
import "@unocss/reset/tailwind.css";
import "./style.css";
import "uno.css";
import APP from "./App.vue";
import { MountRouterToApp } from "./routers";
import { registerPermissionToApp, registerElementUI } from "./plugins";
const app: App = createApp(APP);

// 注册element ui
registerElementUI(app);

// 路由挂载
MountRouterToApp(app).then();

// 获取用户信息后挂载权限组件相关
// 注册权限插件
const permissionCodeSet = ["xx"]; // 权限集合
registerPermissionToApp(app, { permissionCodeSet });
// 页面挂载
app.mount("#app");
