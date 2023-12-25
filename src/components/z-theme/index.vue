<template>
  <NConfigProvider :theme="theme" :theme-overrides="themeOverrides" abstract>
    <slot></slot>
  </NConfigProvider>
</template>
<script setup lang="ts">
import { useTheme } from "@/hooks/index";
defineOptions({
  name: "ZTheme",
});
const { NConfigProvider, theme, themeOverrides } = useTheme();
</script>
