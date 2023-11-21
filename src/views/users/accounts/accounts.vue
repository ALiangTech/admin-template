<template>
  <section>
    accounts
    <button @click="switchTheme">switch</button>
  </section>
</template>
<script setup lang="ts">
import { switchTheme } from "@/hooks/useTheme";
defineOptions({
  name: "UserAccounts",
});
</script>
