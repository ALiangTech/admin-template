import type { GlobalThemeOverrides } from "naive-ui";
import { NConfigProvider, useOsTheme, darkTheme } from "naive-ui";
import type { BuiltInGlobalTheme } from "naive-ui/es/themes/interface";
import type { StyleValue } from "vue";
import { computed, onMounted, ref } from "vue";
import { toKebabCase } from "@/utils";
const lightThemeOverrides: GlobalThemeOverrides = {
  common: {
    // primaryColor: '#000000'
  },
  // ...
};

// naive-ui 变量覆盖
const darkThemeOverrides: GlobalThemeOverrides = {
  common: {
    // primaryColor: '#FFFFFF'
  },
  // ...
};

// naive-ui 给的主题变量不够用 故自定义一套
interface customThemeVars {
  menu: {
    itemBgColor: string; // 菜单项背景色
    itemActiveBgColor: string; // 被激活的菜单背景色
    itemTextColor: string; // 菜单文字颜色
  };
  menuItemBgColor?: string; // 菜单项背景颜色
  menuItemActiveTextColor?: string; // 菜单激活的文字颜色
  menuItemActiveBgColor?: string; // 菜单激活的文字颜色
}
type customThemeVarsKey = keyof customThemeVars;

const customLight: customThemeVars = {
  menu: {
    itemBgColor: "#ccc",
    itemActiveBgColor: "#ccc",
    itemTextColor: "#ccc",
  },
};
const customDark: customThemeVars = {
  menu: {
    itemBgColor: "#fff",
    itemActiveBgColor: "#fff",
    itemTextColor: "#fff",
  },
};

const osThemeRef = useOsTheme(); // 获取系统默认主题 dark or light
export const naiveThemeVars = ref<BuiltInGlobalTheme | null>(null);
/* 切换theme 主题 */
export function switchTheme() {
  naiveThemeVars.value = naiveThemeVars.value ? null : darkTheme;
}
export function useCustomThemeVars(moduleName: customThemeVarsKey) {
  const customeThemeVars = computed(() => {
    return naiveThemeVars.value
      ? customDark[moduleName]
      : customLight[moduleName];
  });
  /** 将themeVars 变量绑定到style 作为css变量 */
  function objectToCSSVariables(data: Object, prefix: string) {
    let cssVars: any = {};
    Object.entries(data).forEach(([key, value]) => {
      const cssVarsKey = `--x-${prefix}-${toKebabCase(key)}`;
      cssVars[cssVarsKey] = value;
    });
    return cssVars;
  }
  const styleCssVariables = computed<StyleValue>(() => {
    const data = customeThemeVars.value;
    return objectToCSSVariables(data as Object, moduleName);
  });
  const naiveThemeOverrides = computed(() =>
    naiveThemeVars.value === null ? lightThemeOverrides : darkThemeOverrides,
  );
  onMounted(() => {
    naiveThemeVars.value = osThemeRef.value === "dark" ? darkTheme : null;
  });
  return {
    customeThemeVars,
    styleCssVariables,
    naiveThemeOverrides,
    naiveThemeVars,
    switchTheme,
  };
}

export default function useTheme() {
  const themeOverrides = computed(() =>
    naiveThemeVars.value === null ? lightThemeOverrides : darkThemeOverrides,
  );
  onMounted(() => {
    naiveThemeVars.value = osThemeRef.value === "dark" ? darkTheme : null;
  });
  return { NConfigProvider, naiveThemeVars, themeOverrides, switchTheme };
}
