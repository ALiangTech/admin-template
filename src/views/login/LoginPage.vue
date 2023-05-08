<template>
  <div>login</div>
</template>
<script setup lang="ts">
import useHttp from "@/hooks/useHttp";
useHttp("/login", { param: { name: "1234" } });
</script>
