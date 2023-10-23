<template>
  <section
    class="relative flex p-2 rounded-4px bg-white gap-2 items-center justify-center"
  >
    <div ref="gbg" class="absolute bg-lime-2 left-0 h-1.5em rounded-6px"></div>
    <div
      v-for="item of list"
      ref="doms"
      :key="item.value"
      class="text-title cursor-pointer z-1 px-1"
      @click="handerClick(item.value)"
    >
      <span>{{ item.label }}</span>
    </div>
  </section>
</template>

<script setup lang="ts">
import { gsap } from "gsap";
import { watchEffect, nextTick } from "vue";
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
  const { offsetLeft, offsetWidth } = target;
  gsap.to(gbg.value, { x: offsetLeft, width: offsetWidth, duration: 0.3 });
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
