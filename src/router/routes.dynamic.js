import React from "react";
// import { lazyload } from "@/unitls/lazyload";
import statieRoutes from "./routes.statie";

// if (JSON.parse(localStorage.Layout)) {
// const tree = JSON.parse(localStorage.Layout);
// console.log(tree);
function getRouterData(tree, flag = true) {
  let routes = [];

  for (let i = 0; i < tree.length; i++) {
    let Component = React.lazy(() => import(`@/views/${tree[i].component}`));
    // console.log(tree[i].component);
    let path = null;
    path = tree[i].path;
    if (!flag) {
      tree[i].path[0] === "/"
        ? (path = tree[i].path.slice(1, tree[i].length))
        : (path = tree[i].path);
    }

    routes.push({
      path: path,
      element: (
        <React.Suspense fallback={<div>login.....</div>}>
          <Component />
        </React.Suspense>
      ),
      children: tree[i].children
        ? getRouterData(tree[i].children, false)
        : null,
    });
  }
  // console.log(routes);
  return routes;
}
// const routes = getRouterData(tree);
// routers = [...routers, ...routes];
// }

const getRouter = () => {
  const routerDate = localStorage.Layout ? JSON.parse(localStorage.Layout) : [];
  const data = getRouterData(routerDate);
  // console.log(data);

  return [...data, ...statieRoutes];
};

export default getRouter;
