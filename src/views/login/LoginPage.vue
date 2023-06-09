<template>
  <section class="flex flex-justify-center flex-items-center h-screen login-bg">
    <div class="form flex flex-justify-center flex-items-center">
      <div class="flex w-4xl">
        <div class="flex-1" @click="toggleDark()">left</div>
        <div class="flex-1">
          <component :is="currentComponent"></component>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { ref, computed } from "vue";
import type { TabPaneProps } from "element-plus";
import { PasswordForm, PhoneForm } from "./modules/forms";
import { useDark, useToggle } from "@vueuse/core";

const isDark = useDark();
const toggleDark = useToggle(isDark);
type TabItem = { id: number } & TabPaneProps;
interface ComponentMap {
  [key: string]: any;
}
const NAME_PASSWORD = "password";
const NAME_PHONE = "phone";
const components_map: ComponentMap = {
  [NAME_PASSWORD]: PasswordForm,
  [NAME_PHONE]: PhoneForm,
};
const activeName = ref<string>(NAME_PASSWORD);
const currentComponent = computed(() => {
  return components_map[activeName.value];
});
const tabs: TabItem[] = [
  {
    id: 1,
    label: "账号密码登录",
    disabled: false,
    name: NAME_PASSWORD,
    closable: false,
    lazy: false,
  },
  {
    id: 2,
    label: "手机号登录",
    disabled: false,
    name: NAME_PHONE,
    closable: false,
    lazy: true,
  },
];
</script>
<style scoped>
.login-bg {
  background-image: url("./modules/assets/darkBg.svg");
  background-repeat: no-repeat;
  background-size: 100%;
}

.form > div {
  background-color: var(--el-bg-color);
  box-shadow: 1px 1px 20px 0 #00000057;
  border-radius: var(--el-border-radius-base);
}
</style>
