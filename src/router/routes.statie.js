import { Navigate } from "react-router-dom";
import { lazyload } from "@/unitls/lazyload";
const Login = lazyload("Login");
const Test = lazyload("textes");
const routes = [
  {
    path: "/",
    element: <Navigate to="/login" />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/test",
    element: <Test />,
  },
];
export default routes;
