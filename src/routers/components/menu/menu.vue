<template>
  <section :style="[styleCssVariables, naiveThemeStyle]" class="pt-16px">
    <img :src="LogoSrc" class="w-200px h-48px object-contain" alt="logo图片" />
    <nav class="pt-16px">
      <ol class="list-none m0 p0">
        <template v-for="item of props.menuList" :key="item.routeName">
          <li
            class="flex flex-col items-center py-2 px-4 cursor-pointer menu-item-bg-color border-rd-4px scale-85"
            @click="
              ($event) => {
                animateClickEffect($event.currentTarget as Element);
                navigateToRoute({ path: item.path });
              }
            "
          >
            <span class="text-12px text-nowrap">{{ item.label }}</span>
          </li>
        </template>
      </ol>
    </nav>
  </section>
</template>

<script setup lang="ts">
import type { MenuComponent } from "./menu";
import { useRouterForMenu } from "./useRouter";
import { useCustomThemeVars } from "@/hooks";
import { computed } from "vue";
import useMenuAnimation from "./useAnimation";
import LogoSrc from "@/assets/logo.png";
const props = defineProps<MenuComponent.Props>();
const { navigateToRoute } = useRouterForMenu();
const { styleCssVariables, naiveThemeVars } = useCustomThemeVars("menu");
const naiveThemeStyle = computed(() => {
  return {
    backgroundColor: naiveThemeVars.value?.common.baseColor,
  };
});
const { animateClickEffect } = useMenuAnimation();
</script>
<style scoped>
.menu-item-bg-color {
  background-color: var(--x-menu-item-bg-color);
}
</style>
