<template>
  <main class="flex flex-col justify-between h-full w-full">
    <!-- 内容 -->
    <section ref="contentRef" class="flex-1 relative overflow-hidden">
      <slot name="content"></slot>
    </section>
    <!-- 菜单 -->
    <slot name="menu"></slot>
  </main>
</template>
<script setup lang="ts">
import { gsap } from "gsap/gsap-core";
import { onMounted, ref } from "vue";
defineOptions({
  name: "RootLayout",
});
const contentRef = ref<gsap.TweenTarget>(null);
onMounted(() => {
  return gsap.fromTo(contentRef.value, { y: "-100vh" }, { y: 0, duration: 1 });
});
</script>
