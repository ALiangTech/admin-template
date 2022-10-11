import { h, defineComponent } from "vue";
import { RouteMeta, RouteRecordRaw } from "vue-router";
import { PermissionCode } from "@/plugins/permissions";
import { asyncRoutes } from "@/routers";
import menuClass from "./menu.module.css";

console.log(menuClass["hidden-menu"]);
// 根据routes生成有权限菜单数据
interface CreateMenuDataFromRouteParams {
  routes: RouteRecordRaw[] | undefined;
  codes: PermissionCode;
  hidden: boolean;
}
function createMenuDataFromRoute(params: CreateMenuDataFromRouteParams) {
  const temp: any[] = [];
  const { routes, codes, hidden } = params;
  if (routes) {
    routes.forEach((route) => {
      const { meta, children } = route;
      const {
        code,
        menu: { label },
      } = meta as RouteMeta;
      if (codes.includes(code)) {
        const menuItem = h(
          "div",
          {},
          h(
            "div",
            {
              onClick: (e: Event) => {
                // const dom = e.target?.parentElement.nextSibling;
                const target = e.target as HTMLElement;
                if (target) {
                  const dom = target.parentElement?.nextSibling as HTMLElement;
                  if (dom) {
                    dom.classList.toggle(menuClass["hidden-menu"]);
                  }
                }
              },
            },
            label
          )
        );
        temp.push(
          h(
            "div",
            {
              class: hidden ? menuClass["hidden-menu"] : "",
            },
            [
              menuItem,
              ...createMenuDataFromRoute({
                routes: children,
                codes,
                hidden: true,
              }),
            ]
          )
        );
      }
    });
  }
  return temp;
}

export default defineComponent({
  setup() {
    const menu = createMenuDataFromRoute({
      routes: asyncRoutes,
      codes: ["xx", "234"],
      hidden: false,
    });
    return () => {
      return <div>{menu}</div>;
    };
  },
});
