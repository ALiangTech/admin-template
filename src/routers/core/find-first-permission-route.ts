// 查找第一个有权限的路由
import { RouteRecordRaw } from "vue-router";

interface FindFirstPermissionParams {
  routes: RouteRecordRaw[];
}
type Find = FindFirstPermissionParams;
export default function findFirstPermissionRoute({
  routes,
}: FindFirstPermissionParams) {
  let route: RouteRecordRaw | undefined;
  function Find({ routes }: Find) {
    const [first] = routes;
    const { children } = first;
    if (children && children.length) {
      Find({ routes: children });
    } else {
      route = first;
    }
  }
  Find({ routes });
  return route;
}
