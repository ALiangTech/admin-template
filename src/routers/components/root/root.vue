<template>
  <!-- <HasPermissionControl code="xxs">
    <div>有权限</div>
  </HasPermissionControl>
  <Menu></Menu>
  <div>================</div> -->
  <Layout>
    <template #content>
      <router-view v-slot="{ Component }">
        <RouterTransition>
          <component :is="Component" />
        </RouterTransition>
      </router-view>
    </template>
    <template #menu>
      <Menu></Menu>
    </template>
  </Layout>
</template>

<script setup lang="ts">
import Menu from "@/routers/components/menu/index";
import Layout from "./layout.vue";
import RouterTransition from "./transition.vue";
import { firstPermissionRoute } from "@/routers";

console.log(firstPermissionRoute, "ss");

defineOptions({
  name: "RootPage",
});
</script>
