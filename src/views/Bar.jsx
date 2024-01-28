// import { useContext } from "react";
// import dynamicRoutes from "@/router/routes.dynamic";
// import { RoutesContext } from "@/router/index";
// import { useNavigate } from "react-router-dom";
// const Bar = () => {
//   const [, setRoutes] = useContext(RoutesContext);
//   const navigate = useNavigate();
//   return (
//     <div
//       onClick={() => {
//         setRoutes(dynamicRoutes);
//         navigate("/index");
//       }}
//     >
//       Bar
//     </div>
//   );
// };
const Bar = () => {
  return <div className="h-[100vh] bg-cyan-400">Bar</div>;
};

export default Bar;
