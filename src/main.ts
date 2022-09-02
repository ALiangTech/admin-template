import { createApp, App } from "vue";
import "@unocss/reset/tailwind.css";
import "./style.css";
import "uno.css";
import APP from "./App.vue";
import { MountRouterToApp } from "./routers";
const app: App = createApp(APP);

// 路由挂载
MountRouterToApp(app);

// 页面挂载
app.mount("#app");
