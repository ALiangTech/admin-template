<template>
  <main ref="contentRef" class="flex justify-between h-full w-full">
    <!-- 菜单 -->
    <slot name="menu"></slot>
    <!-- 内容 -->
    <section class="flex-1 relative overflow-hidden">
      <slot name="content"></slot>
    </section>
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
  gsap.fromTo(contentRef.value, { y: "-100vh" }, { y: 0, duration: 0.5 });
});
</script>
