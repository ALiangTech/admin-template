<template>
  <section :style="[styleCssVariables, naiveThemeStyle]" class="mt-8px">
    <nav class="w-60% m-auto">
      <ol class="flex list-none m0 p0">
        <template v-for="item of props.menuList" :key="item.routeName">
          <li class="hover:translate-y--8px">
            <div
              class="flex flex-col items-center py-2 px-4 cursor-pointer menu-item-bg-color border-rd-4px scale-85"
              @click="
                ($event) => {
                  animateClickEffect($event.currentTarget as Element);
                  navigateToRoute({ path: item.path });
                }
              "
            >
              <component :is="icons.get(item.icon)"></component>
              <div>
                <span class="text-12px text-nowrap">{{ item.label }}</span>
              </div>
            </div>
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
import useMenuAnimation from "./useAnimation";
const props = defineProps<MenuComponent.Props>();
const { navigateToRoute } = useRouterForMenu();
const icons = useIcons();
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
