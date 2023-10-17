<template>
  <!-- <HasPermissionControl code="xxs">
    <div>有权限</div>
  </HasPermissionControl>
  <Menu></Menu>
  <div>================</div> -->
  <Layout>
    <template #content>
      <router-view></router-view>
    </template>
    <template #menu>
      <Menu></Menu>
    </template>
  </Layout>
</template>

<script setup lang="ts">
import Menu from "@/routers/components/menu/index";
import Layout from "./layout.vue";
import { firstPermissionRoute } from "@/routers";

console.log(firstPermissionRoute, "ss");

defineOptions({
  name: "RootPage",
});
</script>
