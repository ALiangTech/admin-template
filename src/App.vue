<template>
  <NConfigProvider :theme="theme" :theme-overrides="themeOverrides" abstract>
    <router-view></router-view>
  </NConfigProvider>
</template>
<script setup lang="ts">
import { useTheme } from "@/hooks/index";
const { NConfigProvider, theme, themeOverrides } = useTheme();
</script>
