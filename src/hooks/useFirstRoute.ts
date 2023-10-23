// 多children 下跳转第一个有权限的菜单

import { isArray } from "lodash-es";
import { useRoute, useRouter } from "vue-router";

export default function useFirstRoute() {
  const { path } = useRoute();
  const router = useRouter();
  const currentRoute = router.getRoutes().find((item) => item.path === path);
  if (currentRoute && isArray(currentRoute?.children)) {
    const [first] = currentRoute.children;
    if (first) {
      const { name } = first;
      router.push({ name });
    }
  }
}
