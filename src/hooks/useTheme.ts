import type { GlobalThemeOverrides } from "naive-ui";
import { NConfigProvider, useOsTheme, darkTheme } from "naive-ui";
import type { BuiltInGlobalTheme } from "naive-ui/es/themes/interface";
import { computed, onMounted, ref } from "vue";
const lightThemeOverrides: GlobalThemeOverrides = {
  common: {
    // primaryColor: '#000000'
  },
  // ...
};

const darkThemeOverrides: GlobalThemeOverrides = {
  common: {
    // primaryColor: '#FFFFFF'
  },
  // ...
};

// naive-ui 给的主题变量不够用 故自定义一套
interface customThemeVars {
  menuItemBgColor: string; // 菜单项背景颜色
  menuItemActiveTextColor: string; // 菜单激活的文字颜色
  menuItemActiveBgColor: string; // 菜单激活的文字颜色
}

const customLight: customThemeVars = {
  menuItemBgColor: "#cccccc30",
  menuItemActiveTextColor: "#fff",
  menuItemActiveBgColor: "rgba(24, 160, 88, 0.1)",
};
const customDark: customThemeVars = {
  menuItemBgColor: "#cccccc30",
  menuItemActiveTextColor: "#18A058FF",
  menuItemActiveBgColor: "rgba(24, 160, 88, 0.5)",
};

const osThemeRef = useOsTheme();
export const theme = ref<BuiltInGlobalTheme | null>(null);
/* 切换theme 主题 */
export function switchTheme() {
  theme.value = theme.value ? null : darkTheme;
}
export function useCustomThemeVars() {
  return computed(() => {
    return theme.value ? customDark : customLight;
  });
}
export default function useTheme() {
  const themeOverrides = computed(() =>
    theme.value === null ? lightThemeOverrides : darkThemeOverrides,
  );
  onMounted(() => {
    theme.value = osThemeRef.value === "dark" ? darkTheme : null;
  });
  return { NConfigProvider, theme, themeOverrides, switchTheme };
}
