<template>
  <HasPermissionControl code="xx">
    <div>有权限</div>
  </HasPermissionControl>
  <Menu></Menu>
  <div>================</div>
  <router-view></router-view>
</template>

<script>
export default {
  name: "RootPage",
};
</script>
<script setup>
import Menu from "@/routers/components/menu/index";
import { firstPermissionRoute } from "@/routers";

console.log(firstPermissionRoute, 'ss')

</script>
