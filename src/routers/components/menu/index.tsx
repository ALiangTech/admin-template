import type { DefineComponent, VNode } from "vue";
import type { Menu } from "@/routers/core/create-menu-data";
import type { RouteRecordName,RouteLocationNormalizedLoaded } from "vue-router";
import { h, defineComponent, onMounted} from "vue";
import { menu } from "@/routers";
import MenuGrapht from './graph.vue';
import { useRouter,useRoute } from "vue-router";
import { isString } from 'lodash-es'
import useMenuAnimation from "./useAnimation";
interface CreateMenuVnode {
  menu: Menu[];
}
interface IconVondeMap {
  [prop: string]: DefineComponent<{}, {}, any>
}
const icons:IconVondeMap = { MenuGrapht }

// 确保上一次点击完成下一次才能点击
// 只处理同步callback
// 用于解决频繁的切换导致动画紊乱
function waitForPreviousClick() {
    let canClick = true;
    return (callBack: Function) => {
       if(canClick) {
        canClick = false;
        callBack()
        setTimeout(() => {
          canClick = true
        }, 2500)
       }
    }
}
const waitFun = waitForPreviousClick();

// 当前的菜单不能重复点击
// 用于解决 在二级菜单的时候 点击一级菜单会导致路由丢失
function disableDuplicateClicks(currentRoute:RouteLocationNormalizedLoaded,routeName: RouteRecordName | undefined, callBack:Function ) {
   
    if(isSameRoute(currentRoute, routeName)) {
      return // 重复点击
    }
    callBack();
}

// 判断routeName是否是当前的路由
function isSameRoute(currentRoute:RouteLocationNormalizedLoaded,routeName: RouteRecordName | undefined,) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { matched:[_, currentRouter] } = currentRoute;
      const { name } = currentRouter
      return name === routeName
}

// 路由默认高亮背景色
function defaultHighlightBgColor(currentRoute:RouteLocationNormalizedLoaded,routeName: RouteRecordName | undefined) {
  if(isSameRoute(currentRoute, routeName)) {
    return { 'background': 'radial-gradient(#ccc 50px, #FFF 50%)'}
  }
  return {}
}

/**
 * @description 获取默认的高亮dom
 * @description 函数执行前提 我全局只有菜单里面有自定义属性data-high-light
 * @description 通过menuTree 中的el 提取要高亮的dom
 *
 */
function getDefaultHighLightDom(menuTree:any[],route:RouteLocationNormalizedLoaded) {
    const targets = menuTree.map(({ el: { children } }) => {
      const [ target ] = children
      return target
    })
    const currentHighLightDom = targets.find(el => {
      const routeName =  el.getAttribute("data-route-name")
      return isSameRoute(route, routeName)
    })
    return currentHighLightDom
}

export default defineComponent({
  setup() {
    const router = useRouter();
    const route = useRoute()
    const { animateClickEffect, setProviousDomValue } = useMenuAnimation();
    let menuTree: VNode[] = [];
    function createLabel(label: string) {
      return h("div", {
        class: {
          "text-4": "text-4",
          "scale-80": "scale-80",
          'select-none': "select-none"
        }
      }, {
        default: () => label
      })
    }
    function renderIcon(icon: string) {
      if (isString(icon)) {
        const temp = icons[icon]
        return temp ? h(temp) : null
    
      }
      return null
    }
    function createMenuItem(menuItem:Menu) {
      const { icon, label } = menuItem;
      return h('div', {
        class: {
          "flex": "flex",
          "flex-col": "flex-col",
          "items-center": "items-center"
        }
      }, [
        icon && renderIcon(icon as string), createLabel(label)
      ])
    }
    function createMenuVnode({ menu }: CreateMenuVnode) {
      function create({ menu }: CreateMenuVnode): VNode[] {
        return menu.map((menuItem) => {
          const { routeName } = menuItem;
          const labelVnode = h(
            "div",
            {
              onClick: () => {
                const currentElement = labelVnode.el;
                disableDuplicateClicks(route,routeName, () => {
                  waitFun(() => {
                    animateClickEffect(currentElement);
                    router.push({ name: routeName });
                  })
                });
              },
              class: {
                'w-64px': 'w-64px',
                'flex': 'flex',
                'justify-center': 'justify-center',
                'items-center': 'items-center',
                'pt-1':'pt-1',
                'bg-#fff': 'bg-#fff',
                'cursor-pointer': 'cursor-pointer',
                'border-rd-4px':'border-rd-4px',
              },
              style: defaultHighlightBgColor(route, routeName),
              'data-route-name': routeName
            },
            [createMenuItem(menuItem)]
          );
          // onMounted(() => {
          //   // labelVnod.el 得在dom渲染后才能获取
          //   previousDom.value = getDefaultHighLightDom(route, routeName, labelVnode.el)
          // })
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
    onMounted(() => {
      // 涉及dom操作 故放在dom渲染后操作
      setProviousDomValue(getDefaultHighLightDom(menuTree,route))
    })
    return () => {
      return (
        <section class="flex justify-center items-center h-64px bg-lime-5" id="menu">
          <div class="flex w-50% overflow-hidden gap-2">
            {menuTree}
          </div>
        </section>
      );
    };
  },
});
