import { useState, createContext, useContext } from "react";
import { BrowserRouter, useRoutes } from "react-router-dom";
import dynamicRoutes from "../router/routes.dynamic";
export const RoutesContext = createContext();
const Routes = () => {
  const [routes] = useContext(RoutesContext);
  return useRoutes(routes);
};
const Router = () => {
  // const dynamicRoutes = localStorage.getItem();
  const [routes, setRoutes] = useState(dynamicRoutes());
  return (
    <RoutesContext.Provider value={[routes, setRoutes]}>
      <BrowserRouter>
        <Routes></Routes>
      </BrowserRouter>
    </RoutesContext.Provider>
  );
};
export default Router;
/**
 * <Routes>
 * <Route path="/" element={}></Route>
 * </Routes>
 */
