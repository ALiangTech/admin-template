<template>
  <section class="flex h-screen">
    <div>left</div>
    <div>
      <el-tabs v-model="activeName" class="demo-tabs">
        <template v-for="item of tabs" :key="item.id">
          <el-tab-pane :label="item.label" :name="item.name"></el-tab-pane>
        </template>
      </el-tabs>
      <component :is="currentComponent"></component>
    </div>
  </section>
</template>
<script setup lang="ts">
import { ref, computed } from "vue";
import type { TabPaneProps } from "element-plus";
import { PasswordForm, PhoneForm } from "./modules/forms";
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
