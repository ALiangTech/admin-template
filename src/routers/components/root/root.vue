<template>
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
defineOptions({
  name: "RootPage",
});
</script>
