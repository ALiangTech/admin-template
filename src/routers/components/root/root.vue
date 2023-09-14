<template>
  <HasPermissionControl code="xx">
    <div>有权限</div>
  </HasPermissionControl>
  <Menu></Menu>
  <div>================</div>
  <router-view></router-view>
</template>

<script setup lang="ts">
import Menu from "@/routers/components/menu/index";
import { firstPermissionRoute } from "@/routers";

console.log(firstPermissionRoute, "ss");

defineOptions({
  name: "RootPage",
});
</script>
