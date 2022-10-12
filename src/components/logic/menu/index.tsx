import { h, defineComponent } from "vue";
import {
  RouteMeta,
  RouteRecordRaw,
  useRouter,
  useRoute,
  Router,
  RouteLocationNormalizedLoaded,
} from "vue-router";
import { PermissionCode } from "@/plugins/permissions";
import { asyncRoutes } from "@/routers";
import menuClass from "./menu.module.css";
import { useStorage } from "@vueuse/core";

console.log(menuClass["hidden-menu"]);
// 根据routes生成有权限菜单数据
interface CreateMenuDataFromRouteParams {
  routes: RouteRecordRaw[] | undefined;
  codes: PermissionCode;
  hidden: boolean;
  parentName: RouteRecordRaw["name"];
  parentRoute: RouteRecordRaw | null;
  router: Router;
}
interface HighlightMenuItemParams {
  route: RouteRecordRaw;
  router: Router;
}
const sessionStorageRoute = useStorage("click-route", [], sessionStorage);
function createMenuDataFromRoute(params: CreateMenuDataFromRouteParams) {
  const temp: any[] = [];
  const { routes, codes, hidden, parentName, router, parentRoute } = params;
  if (routes) {
    routes.forEach((route) => {
      const { meta, children, name } = route;
      const {
        code,
        menu: { label },
      } = meta as RouteMeta;
      // permission judge
      if (codes.includes(code)) {
        if (!hidden) {
          // addRoute current route don`t contains children
          router.addRoute({
            ...route,
            children: [],
          });
        }
        const menuItem = h(
          "div",
          {},
          h(
            "div",
            {
              onClick: async (e: Event) => {
                function saveClickRoutesInSessionStorage() {
                  if (parentRoute) {
                    sessionStorageRoute.value = {
                      ...parentRoute,
                      children: [route],
                    };
                  } else {
                    sessionStorageRoute.value = route;
                  }
                }
                // const dom = e.target?.parentElement.nextSibling;
                const target = e.target as HTMLElement;
                if (target) {
                  const dom = target.parentElement?.nextSibling as HTMLElement;
                  if (dom) {
                    dom.classList.toggle(menuClass["hidden-menu"]);
                  }
                  // have parentName but children is null
                  // don`t have parentName but children is null
                  if (parentName) {
                    if (children?.length) {
                      router.addRoute(parentName, { ...route, children: [] });
                    } else {
                      router.addRoute(parentName, route);
                      await router.push(route);
                      saveClickRoutesInSessionStorage();
                    }
                  } else {
                    if (!children?.length) {
                      await router.push(route);
                      saveClickRoutesInSessionStorage();
                    }
                  }
                  console.log(router.getRoutes(), "getRoutes");
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
                parentName: children?.length ? name : "",
                router,
                parentRoute: route,
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
    const router = useRouter();
    const menu = createMenuDataFromRoute({
      routes: asyncRoutes,
      codes: ["xx", "234"],
      hidden: false,
      parentName: "",
      router,
      parentRoute: null,
    });
    return () => {
      return <div>{menu}</div>;
    };
  },
});
