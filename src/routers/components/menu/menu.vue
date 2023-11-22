<template>
  <section class="py-7px" :style="[styleCssVariables, naiveThemeStyle]">
    <nav class="w-60% m-auto">
      <ol class="flex list-none m0 p0 gap-2">
        <template v-for="item of props.menuList" :key="item.routeName">
          <li
            class="flex flex-col items-center w-80px cursor-pointer p-2 menu-item-bg-color border-rd-4px hover:translate-y--8px"
            @click="navigateToRoute({ path: item.path })"
          >
            <component :is="icons.get(item.icon)"></component>
            <span class="scale-70">{{ item.label }}</span>
          </li>
        </template>
      </ol>
    </nav>
  </section>
</template>

<script setup lang="ts">
import type { MenuComponent } from "./menu";
import { useRouterForMenu } from "./useRouter";
import { useIcons } from "./icons";
import { useCustomThemeVars } from "@/hooks";
import { computed } from "vue";
const props = defineProps<MenuComponent.Props>();
const { navigateToRoute } = useRouterForMenu();
const icons = useIcons();
const { styleCssVariables, naiveThemeVars } = useCustomThemeVars("menu");
const naiveThemeStyle = computed(() => {
  return {
    backgroundColor: naiveThemeVars.value?.common.baseColor,
  };
});
</script>
<style scoped>
.menu-item-bg-color {
  background-color: var(--x-menu-item-bg-color);
}
</style>
