// 过滤掉无权限的路由
import type { PermissionCode } from "@/plugins/permissions/types";
import type { RouteRecordRaw } from "vue-router";
type Routes = RouteRecordRaw[];
interface FilterPermissionParams {
  codes: PermissionCode;
  routes: Routes;
}
interface Filter {
  routes: Routes;
}
export default function filterPermissionRoutes(params: FilterPermissionParams) {
  const { codes, routes } = params;
  let hasPermissionRoutes: Routes = [];
  function filter({ routes }: Filter) {
    return routes.filter((route) => {
      const { meta, children = [] } = route;
      if (meta) {
        const { code } = meta;
        if (codes.includes(code)) {
          // have permission
          route.children = filter({ routes: children });
          return route;
        } else {
          return false;
        }
      }
      return true;
    });
  }
  hasPermissionRoutes = filter({ routes });
  return hasPermissionRoutes;
}
