import { h, ref, defineComponent, VNode } from "vue";
import { RouteMeta, RouteRecordRaw, Router } from "vue-router";
import { PermissionCode } from "@/plugins/permissions";
import { asyncRoutes } from "@/routers";
import menuClass from "./menu.module.css";
import { useStorage } from "@vueuse/core";

type RouteName = RouteRecordRaw["name"];

type SessionRouteNames = RouteName[];
const sessionStorageRouteNames = useStorage<SessionRouteNames>(
  "click-route",
  [],
  sessionStorage
);

// 平铺有权限的路由数据 跟getRoutes一样的效果 不过children都是空数组
export const tileHavePermissionRoutes: RouteRecordRaw[] = [];
interface CreateMenuDataFromRouteParams {
  routes: RouteRecordRaw[] | undefined;
  codes: PermissionCode;
  hidden: boolean; // 控制默认只渲染一级菜单
  parentName: RouteName;
  parentRoute: RouteRecordRaw | null;
  router: Router;
}
function createMenuDataFromRoutes(params: CreateMenuDataFromRouteParams) {
  const temp: VNode[] = [];
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
        tileHavePermissionRoutes.push({ ...route, children: [] });
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
                    sessionStorageRouteNames.value = [
                      parentRoute.name,
                      route.name,
                    ];
                  } else {
                    sessionStorageRouteNames.value = [route.name];
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
              ...createMenuDataFromRoutes({
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

// 浏览器刷新
interface AddRouteParams {
  routes: RouteRecordRaw[];
  router: Router;
}
function addRouteWhenReload({ routes, router }: AddRouteParams) {
  const currentRouteNames = sessionStorageRouteNames.value;
  let initRoutes: RouteRecordRaw[] = []; // 需要初始的routes 根据本地存储的routeName 来匹配
  if (currentRouteNames) {
    currentRouteNames.forEach((routeName) => {
      const findRoute = routes.find(({ name }) => name === routeName);
      if (findRoute) {
        initRoutes.push(findRoute);
      }
    });
  }
  // 判断获取长度 是否跟存储的name长度是否相等 判断是否手动修改了存储的name
  let temp: RouteRecordRaw;
  if (initRoutes.length === currentRouteNames.length && initRoutes.length) {
    const initRoutesReverse = initRoutes.reverse();
    temp = initRoutesReverse.reduce((total, currentValue) => {
      currentValue.children?.push(total);
      return currentValue;
    });
    router.addRoute(temp);
    router.push({ name: initRoutesReverse[0].name }).then();
  }
}

// 菜单数据初始化 in mount router
interface InitMenu {
  router: Router;
}
const menu = ref<VNode[]>([]);
export function initMenu({ router }: InitMenu) {
  menu.value = createMenuDataFromRoutes({
    routes: asyncRoutes,
    codes: ["xx", "234"],
    hidden: false,
    parentName: "",
    router,
    parentRoute: null,
  });
  addRouteWhenReload({ routes: tileHavePermissionRoutes, router });
}

export default defineComponent({
  setup() {
    return () => {
      return <div>{menu.value}</div>;
    };
  },
});
