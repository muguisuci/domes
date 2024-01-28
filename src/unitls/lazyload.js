import React from "react";
import { SpinLoading } from "antd-mobile";
export const lazyload = (componentPath) => {
  if (componentPath.startsWith("@/views/"))
    componentPath = componentPath.replace("@/views/", "");
  const Component = React.lazy(() => import("@/views/" + componentPath));
  return () => (
    <React.Suspense
      fallback={
        <div className="w-[100vw] h-[100vh] bg-yellow-500 flex justify-center items-center">
          <SpinLoading />
        </div>
      }
    >
      <Component />
    </React.Suspense>
  );
};
