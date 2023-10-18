<template>
  <main class="flex flex-col justify-between h-full w-full">
    <!-- 内容 -->
    <section class="flex-1">
      <slot name="content"></slot>
    </section>
    <!-- 菜单 -->
    <slot name="menu"></slot>
  </main>
</template>
<script setup lang="ts">
defineOptions({
  name: "RootLayout",
});
</script>
