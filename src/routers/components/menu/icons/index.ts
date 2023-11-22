// 批量导入该文件夹下的vue文件
const asyncModules = import.meta.glob("./*.vue", {
  eager: true,
});

export function useIcons() {
  const iconsComponentMap = new Map();
  Object.values(asyncModules).forEach((moduleItem) => {
    const component = (moduleItem as any).default;
    const { name } = component;
    iconsComponentMap.set(name, component);
  });
  return iconsComponentMap;
}
