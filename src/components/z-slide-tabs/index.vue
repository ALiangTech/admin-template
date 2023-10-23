<template>
  <section
    class="relative p-2 rounded-4px flex flex-col bg-white gap-2 items-center justify-center h-100%"
  >
    <div ref="gbg" class="absolute bg-lime-2 top-0 h-1.5em rounded-6px"></div>
    <div
      v-for="item of list"
      ref="doms"
      :key="item.value"
      class="text-title cursor-pointer z-2 px-1 w-100% text-center"
      @click="handerClick(item.value)"
    >
      <span>{{ item.label }}</span>
    </div>
  </section>
</template>

<script setup lang="ts">
import { gsap } from "gsap";
import { watchEffect, nextTick, ref } from "vue";
interface ListItem {
  label: string;
  value: number | string;
}
interface Props {
  list: ListItem[];
  modelValue: number | string;
}
const props = withDefaults(defineProps<Props>(), {
  list: () => [
    { label: "用用户", value: "accounts" },
    { label: "角角色色", value: "roles" },
  ],
});
const emits = defineEmits(["update:modelValue", "change"]);
// 设置当前选中的值
function handerClick(value: string) {
  emits("update:modelValue", value);
  emits("change", value);
}

const gbg = ref();
function handerClickAnimation(e: Node) {
  console.log(e);
  const { target } = e;
  const { offsetTop, offsetWidth } = target;
  gsap.to(gbg.value, { y: offsetTop, width: offsetWidth, duration: 0.3 });
}

// 根据modelValue 值来高亮

const doms = ref<Node>(null);

watchEffect(() => {
  const modelValue = props.modelValue;
  const index = props.list.findIndex((item) => item.value === modelValue);
  nextTick(() => {
    if (doms.value) {
      const target = doms.value[index];
      handerClickAnimation({ target });
    }
  });
});
</script>
