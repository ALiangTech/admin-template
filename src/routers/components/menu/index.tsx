import type { DefineComponent, VNode } from "vue";
import { h, defineComponent } from "vue";
import { menu } from "@/routers";
import type { Menu } from "@/routers/core/create-menu-data";
import MenuGrapht from './graph.vue';
import { useRouter } from "vue-router";
import useMenuAnimation from "./useAnimation";
import { isString } from 'lodash-es'
interface CreateMenuVnode {
  menu: Menu[];
}
interface IconVondeMap {
  [prop: string]: DefineComponent<{}, {}, any>
}
const icons:IconVondeMap = { MenuGrapht }
function renderIcon(icon: string) {
  if (isString(icon)) {
    const temp = icons[icon]
    return temp ? h(temp) : null

  }
  return null
}
export default defineComponent({
  setup() {
    const router = useRouter();
    let menuTree: VNode[] = [];
    function createMenuVnode({ menu }: CreateMenuVnode) {
      function create({ menu }: CreateMenuVnode): VNode[] {
        return menu.map((menuItem) => {
          const { routeName, icon } = menuItem;
          const labelVnode = h(
            "div",
            {
              onClick: () => {
                router.push({ name: routeName });
              },
              class: {
                'text-0': 'text-0',
                'line-height-0': 'line-height-0',
                'w-42px': 'w-42px',
                'h-42px': 'h-42px',
                'rounded-50%': 'rounded-50%',
                'flex': 'flex',
                'justify-center': 'justify-center',
                'items-center': 'items-center',
                'bg-white': 'bg-white',
                'cursor-pointer': 'cursor-pointer'
              }
            },
            [icon && renderIcon(icon as string)]
          );
          return h("div", {
            class: {
              'flex': 'flex',
              'justify-center': 'justify-center',
              'items-center': 'items-center',
            }
          }, [labelVnode]); // create({ menu: children }) // 二级菜单暂时不渲染
        });
      }
      return create({ menu });
    }
    menuTree = createMenuVnode({ menu: menu.value });
    const { menuRef, menuListRef } = useMenuAnimation()
    return () => {
      return (
        <section class="flex justify-center items-center h-64px" ref={menuRef}>
          <div class="flex  bg-lime-1 circle-0  w-48px h-48px overflow-hidden" ref={menuListRef}>
            {menuTree}
          </div>
        </section>
      );
    };
  },
});
