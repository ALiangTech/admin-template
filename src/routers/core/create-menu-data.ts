// 构建菜单数据
import type { RouteRecordRaw } from "vue-router";

interface CreateMenuDataParams {
  routes: RouteRecordRaw[];
}
type Map = CreateMenuDataParams;
export interface Menu {
  routeName: RouteRecordRaw["name"];
  label: string;
  children: Menu[];
}
export default function createMenuData({ routes }: CreateMenuDataParams) {
  let menu: Menu[];
  function mapRoutes({ routes }: Map) {
    return routes
      .map((route) => {
        const { meta, name, children = [] } = route;
        const temp: Menu = { routeName: name, children: [], label: "" };
        if (meta?.menu) {
          const { label } = meta.menu;
          temp.label = label;
          temp.children = mapRoutes({ routes: children });
        }
        return temp;
      })
      .filter(({ label }) => label); // filter no menu data
  }
  menu = mapRoutes({ routes });
  return menu;
}
