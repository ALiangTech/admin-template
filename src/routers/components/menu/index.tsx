import type { VNode } from "vue";
import { h, defineComponent } from "vue";
import { menu } from "@/routers";
import type { Menu } from "@/routers/core/create-menu-data";
import { useRouter } from "vue-router";
interface CreateMenuVnode {
  menu: Menu[];
}
export default defineComponent({
  setup() {
    const router = useRouter();
    let menuTree: VNode[] = [];
    function createMenuVnode({ menu }: CreateMenuVnode) {
      function create({ menu }: CreateMenuVnode): VNode[] {
        return menu.map((menuItem) => {
          const { label, children, routeName } = menuItem;
          const labelVnode = h(
            "div",
            {
              onClick: () => {
                router.push({ name: routeName });
              },
            },
            [label]
          );
          return h("div", [labelVnode, create({ menu: children })]);
        });
      }
      return create({ menu });
    }
    menuTree = createMenuVnode({ menu: menu.value });
    return () => {
      console.log(menu);
      return (
        <div>
          <div>{menuTree}</div>
        </div>
      );
    };
  },
});
