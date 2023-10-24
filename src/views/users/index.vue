<template>
  <ZSliceMenus :route-name="routeName"></ZSliceMenus>
</template>

<script setup lang="ts">
import ZSliceMenus from "@/components/z-slide-menus/index.vue";
import { users } from "./router";
const routeName = users.name as string;
</script>
