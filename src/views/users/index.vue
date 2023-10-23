<template>
  <section class="h-100% w-100% bg-c-primaryLayout">
    <div class="w-300px mx-auto pt-2">
      <ZSliceTabs v-model="routeName" @change="handleRouter"></ZSliceTabs>
    </div>
    <div>
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
