<template>
  <ZSliceMenus :route-name="users.name as string"></ZSliceMenus>
</template>

<script setup lang="ts">
import ZSliceMenus from "@/components/z-slide-menus/index.vue";
import { users } from "./router";
</script>
