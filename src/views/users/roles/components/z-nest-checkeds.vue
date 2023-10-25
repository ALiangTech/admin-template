<script lang="ts">
import { h, ref } from "vue";
import { NCheckbox } from "naive-ui";

interface DataItem {
  label: string;
  value: string;
  checked: string;
  children: DataItem[];
}
// 如果勾选了子级 那么父级 也会被勾选 改组件只满足
// 如果父级 取消了勾选 并且子级有勾选的 那么 子级应该取消勾选
export default {
  props: {
    data: {
      type: Array,
      required: true,
    },
    modelValue: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    const data = props.data as DataItem[];
    const checked = ref({});
    function createCheckedVnode(data: DataItem[]) {
      const vnodes = data.map((item, index) => {
        return h(
          "div",
          {
            class: `flex  border-blue  border-l-1 border-r-0 ${
              index > 0 ? "border-t-1" : "border-t-0"
            } border-b-0 border-solid  px-1`,
          },
          [
            h("div", { class: "flexCenter" }, [
              h(
                NCheckbox,
                {
                  checked: checked.value[item.value],
                  onUpdateChecked: (v) => {
                    checked.value = { [item.value]: v };
                  },
                },
                item.label,
              ),
            ]),
            h("div", { class: "flex-1" }, createCheckedVnode(item.children)),
          ],
        );
      });
      return vnodes;
    }
    return () => {
      return h(
        "div",
        { class: "border-1 border-blue border-solid border-l-0" },
        createCheckedVnode(data),
      );
    };
  },
};
</script>
