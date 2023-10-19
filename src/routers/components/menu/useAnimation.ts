import { gsap } from "gsap";
import { onMounted, ref } from "vue";
// 菜单的渐显
// 菜单icon的动画 从圆形 变成长方形
// 时间轴
const t1 = gsap.timeline();
export default function useMenuAnimation() {
  const menuRef = ref<Object | null>(null);
  const menuListRef = ref<Object | null>(null);
  onMounted(() => {
    createMenuOpacity(menuRef.value);
    createMenuListShape(menuListRef.value);
  });
  function createMenuOpacity(target: gsap.TweenTarget) {
    t1.fromTo(target, { opacity: 0 }, { opacity: 1, duration: 0.5 });
  }
  function createMenuListShape(target: gsap.TweenTarget) {
    t1.fromTo(
      target,
      { clipPath: "circle(0%)" },
      { clipPath: "circle(50%)", duration: 1 },
    );
    t1.fromTo(target, {}, { width: "50%", clipPath: "none", duration: 1 });
  }
  return { menuRef, menuListRef };
}
