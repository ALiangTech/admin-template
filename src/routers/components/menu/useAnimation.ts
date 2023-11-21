import { gsap } from "gsap";
import { ref } from "vue";
// 菜单项 动效
// 时间轴
export const t1 = gsap.timeline();
export const t2 = gsap.timeline();
export const t3 = gsap.timeline();
export default function useMenuAnimation() {
  // 记录上一次操作的dom
  const previousDom = ref<gsap.TweenTarget>();
  // 点击动效 + 添加背景色
  function animateClickEffect(dom: any) {
    if (previousDom.value) {
      t2.to(previousDom.value, {
        background: `radial-gradient(var(--c-menu-item-active-color) 0px, #FFF 0%)`,
        duration: 1,
      }); // 背景颜色消失
    }
    t1.to(dom, { scale: 0.8, duration: 0.2 }); // 先缩小
    t1.to(dom, { scale: 1, duration: 0.2 }); // 在复原
    t3.to(dom, {
      background: `radial-gradient(var(--c-menu-item-active-color) 150px, #FFF 50%)`,
      duration: 1.5,
    }); // 背景颜色 变大 从圆形
    previousDom.value = dom;
  }
  // 设置proviousDom 值
  function setProviousDomValue(value: gsap.TweenTarget) {
    previousDom.value = value;
  }
  return { animateClickEffect, setProviousDomValue };
}
