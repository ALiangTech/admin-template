<template>
  <section class="h-100% flex w-100% bg-c-primaryLayout">
    <div class="w-160px mx-auto">
      <ZSliceTabs v-model="routeName" @change="handleRouter"></ZSliceTabs>
    </div>
    <div class="flex-1">
      <router-view></router-view>
    </div>
  </section>
</template>

<script setup lang="ts">
import ZSliceTabs from "@/components/z-slide-tabs/index.vue";
import { useRouter } from "vue-router";
import { ref } from "vue";
defineOptions({
  name: "Users",
});
const routeName = ref<string>("accounts");
const router = useRouter();
function handleRouter() {
  router.push({ name: routeName.value });
}
</script>
