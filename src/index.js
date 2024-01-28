import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/App";
import ErrorBoundary from "@/component/ErrorBoundary.jsx";
import "@/index.css";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
// export const reRenderUI = () => {
//   root.render(
//     <ErrorBoundary>
//       {/* {App({ a: 1, b: 2, children: {<span>span</span>} })} */}
//       {/* <App a="1" b={2}>
//         <span>span</span>
//       </App> */}
//       <App />
//       {/* <App {...{ a: 1, b: 2 }} /> */}
//     </ErrorBoundary>
//   );
// };
// reRenderUI();
