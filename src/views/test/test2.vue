<template>
  <div>test2222</div>
  <router-view v-slot="{ Component }">
    <component :is="Component || No"> </component>
  </router-view>
</template>

<script setup>
import No from "./no.vue";
</script>
