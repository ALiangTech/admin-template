import type { DefineComponent, VNode } from "vue";
import type { Menu } from "@/routers/core/create-menu-data";
import type { RouteLocationNormalizedLoaded } from "vue-router";
import { h, defineComponent, onMounted} from "vue";
import { menu } from "@/routers";
import MenuGrapht from './graph.vue';
import { useRouter,useRoute } from "vue-router";
import { isString } from 'lodash-es'
import useMenuAnimation from "./useAnimation";
import { useThemeVars } from 'naive-ui'
import { useCustomThemeVars } from "@/hooks";
interface CreateMenuVnode {
  menu: Menu[];
}
interface IconVondeMap {
  [prop: string]: DefineComponent<{}, {}, any>
}
interface MenuTreeItem {
  el: {
    children: Element[]
  }
}
const icons:IconVondeMap = { MenuGrapht }

/**
 * @description 等待上一次点击完成后再执行回调函数 用于解决一级菜单频繁的切换导致动画紊乱
 * @returns {Function} - 返回一个函数，用于执行回调函数
 */
function waitForPreviousClick(): Function {
    let canClick = true;
    return (callBack: () => void) => {
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

/**  
 * @description 禁用重复点击的函数  
 * @param currentRoute - 当前路由的位置信息  
 * @param routeName - 路由记录的名称  
 * @param callBack - 回调函数  
 */
function disableDuplicateClicks(currentRoute:RouteLocationNormalizedLoaded,routeName: string, callBack:Function ) {
    if(isSameRoute(currentRoute, routeName)) {
      return // 重复点击了
    }
    callBack();
}

/**  
 * @description 判断当前路由是否与给定路由名称相同  
 * @param currentRoute 当前路由的位置信息  
 * @param routeName 给定的路由记录名称  
 * @returns 如果当前路由名称与给定路由名称相同，则返回true，否则返回false  
 */
function isSameRoute(currentRoute:RouteLocationNormalizedLoaded,routeName: string,) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { matched:[_, currentRouter] } = currentRoute;
      const { name } = currentRouter
      return name === routeName
}

/**  
 * @description 创建高亮背景样式  
 * @param currentRoute 当前路由的位置信息  
 * @param routeName 给定的路由记录名称  
 * @returns 如果当前路由与给定路由相同，则返回一个对象，该对象包含一个背景样式，用于设置高亮背景颜色。否则返回一个空对象。  
 */
function createHighLightBgStyle(currentRoute:RouteLocationNormalizedLoaded,routeName: string) {
  if(isSameRoute(currentRoute, routeName)) {
    return { 'background': `radial-gradient(var(--c-menu-item-active-color) 50px, #FFF 50%)`}
  }
  return {}
}

/**  
 * @description 获取默认高亮元素
 * @param menuTree 菜单树数据数组  
 * @param route 当前路由的位置信息  
 * @returns 如果找到与当前路由匹配的高亮元素，则返回该元素。否则返回undefined。  
 */
function getDefaultHighLightDom(menuTree:MenuTreeItem[],route:RouteLocationNormalizedLoaded) {
    const targets = menuTree.map(({ el: { children } }) => {
      const [ target ] = children
      return target
    })
    const currentHighLightDom = targets.find(el => {
      const routeName =  el.getAttribute("data-route-name") as string
      return isSameRoute(route, routeName)
    })
    return currentHighLightDom as Element
}

export default defineComponent({
  setup() {
    let menuTree: VNode[] = [];
    const router = useRouter();
    const route = useRoute()
    const { animateClickEffect, setProviousDomValue } = useMenuAnimation();
    const themeVars = useThemeVars();
    const customThemesVars = useCustomThemeVars();
    function createLabel(label: string) {
      return h("div", {
        style: {
          'color':  themeVars.value.primaryColor
        },
        class: {
          "text-4": "text-4",
          "scale-80": "scale-80",
          'select-none': "select-none",
        }
      }, {
        default: () => label
      })
    }
    function createIcon({ icon }: { icon: string; }) {
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
        icon && createIcon({ icon: icon as string }), createLabel(label)
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
                disableDuplicateClicks(route, routeName as string, () => {
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
                'cursor-pointer': 'cursor-pointer',
                'border-rd-4px':'border-rd-4px',
              },
              // style: createHighLightBgStyle(route, routeName as string),
              style: {
                ...createHighLightBgStyle(route, routeName as string)
              },
              'data-route-name': routeName
            },
            [createMenuItem(menuItem)]
          );
          return h("div", {
            class: {
              'flex': 'flex',
              'justify-center': 'justify-center',
              'items-center': 'items-center',
            },
            style: {
              "box-shadow": "1px 0px 5px 1px #ccc"
            }
          }, [labelVnode]); // create({ menu: children }) // 二级菜单暂时不渲染
        });
      }
      return create({ menu });
    }
    menuTree = createMenuVnode({ menu: menu.value });
    onMounted(() => {
      // 涉及dom操作 故放在dom渲染后操作
      setProviousDomValue(getDefaultHighLightDom(menuTree as unknown as MenuTreeItem[],route))
    })
    return () => {
      return (
        <section class="flex justify-center items-center h-64px" id="menu" style={
         {
          "background-color":themeVars.value.baseColor,
          '--c-menu-item-bg-color': customThemesVars.value.menuItemBgColor,
          '--c-menu-item-active-color': customThemesVars.value.menuItemActiveBgColor,
         }
        }>
          <div class="flex w-50% overflow-hidden gap-2 py-2">
            {menuTree}
          </div>
        </section>
      );
    };
  },
});
