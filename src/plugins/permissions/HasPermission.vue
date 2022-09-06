<template>
  <slot v-if="hasPermission"></slot>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    code: {
      type: String,
      default: "",
    },
    permissionCodeSet: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    hasPermission() {
      console.log(this.permissionCodeSet, "xxxx");
      return this.permissionCodeSet.includes(this.code);
    },
  },
});
</script>
