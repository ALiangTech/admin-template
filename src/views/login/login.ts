import { createApp, App } from "vue";
import "@unocss/reset/tailwind.css";
import "uno.css";
import APP from "./LoginPage.vue";
import { registerElementUI } from "@/plugins";
const app: App = createApp(APP);
registerElementUI(app);
// 页面挂载
app.mount("#app");
