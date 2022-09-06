import { createApp, App } from "vue";
import "@unocss/reset/tailwind.css";
import "./style.css";
import "uno.css";
import APP from "./App.vue";
import { MountRouterToApp, router } from "./routers";
import { permission } from "./plugins";
const app: App = createApp(APP);

// 路由挂载
MountRouterToApp(app);
//
const permissionCodeSet = ["xx"];
console.log(permission);

app.use(permission, { permissionCodeSet, router });
// 页面挂载
app.mount("#app");
