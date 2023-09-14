import "vue-router";
interface Menu {
  label: string;
}
declare module "vue-router" {
  interface RouteMeta {
    code: string;
    menu: Menu;
  }
}
