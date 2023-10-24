import type { DefineComponent, VNode } from "vue";
import { h, defineComponent } from "vue";
import { menu } from "@/routers";
import type { Menu } from "@/routers/core/create-menu-data";
import MenuGrapht from './graph.vue';
import { useRouter } from "vue-router";
import { isString } from 'lodash-es'
import { NTooltip } from 'naive-ui'
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
    function createTooltip(vnode:any,text: string) {
      return h(NTooltip, {
        trigger: 'hover',
        delay: 500
      }, {
        trigger: () => h(vnode),
        default: () => text
      })
    }
    function createMenuVnode({ menu }: CreateMenuVnode) {
      function create({ menu }: CreateMenuVnode): VNode[] {
        return menu.map((menuItem) => {
          const { routeName, icon,label } = menuItem;
          const labelVnode = h(
            "div",
            {
              onClick: () => {
                router.push({ name: routeName });
              },
              class: {
                'text-0': 'text-0',
                'line-height-0': 'line-height-0',
                'w-32px': 'w-32px',
                'h-32px': 'h-32px',
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
          }, [createTooltip(labelVnode, label)]); // create({ menu: children }) // 二级菜单暂时不渲染
        });
      }
      return create({ menu });
    }
    menuTree = createMenuVnode({ menu: menu.value });
    return () => {
      return (
        <section class="flex justify-center items-center h-48px bg-lime-5">
          <div class="flex w-50% h-32px overflow-hidden gap-2">
            {menuTree}
          </div>
        </section>
      );
    };
  },
});
