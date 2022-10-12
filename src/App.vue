<template>
  <HasPermissionControl code="xx">
    <div>有权限</div>
  </HasPermissionControl>
  <Menu></Menu>
  <span>-----------------</span>
  <router-view></router-view>
</template>
<script setup lang="ts">
import Menu from "@/components/logic/menu/index.tsx";
</script>
