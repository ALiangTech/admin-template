<template>
  <section class="f"></section>
</template>
<script setup lang="ts">
import useHttp from "@/hooks/useHttp";
useHttp("/login", { param: { name: "1234" } });
</script>
