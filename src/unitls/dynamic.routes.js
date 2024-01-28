import router from "@/router";
import storejs from "storejs";
function createDynamicRoutes(menus, pid = 0) {
  let result = [];
  for (let menu of menus) {
    if (menu.parent_id === pid) {
      const computedPath = menu.component.replace(/^views\//, "");
      // console.log(menu.path, computedPath);
      result.push({
        ...menu,
        component: () => import("@/views/" + computedPath),
        children: createDynamicRoutes(menus, menu.id),
      });
    }
  }
  return result;
}
function addDynamicRoutes(menus) {
  if (!menus) menus = storejs.get("user_menus") || [];
  const dynamicRoutes = createDynamicRoutes(menus);
  storejs.set("dynamicRoutes", dynamicRoutes);
  dynamicRoutes.forEach((route) => router.addRoute(route));
}
export default addDynamicRoutes;
