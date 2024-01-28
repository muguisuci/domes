import React from "react";
import { Breadcrumb } from "antd";
import { useLocation } from "react-router-dom";

const generateBreadcrumbs = (data, pathnames, breadcrumbs) => {
  // console.log(data);
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    const path = item.path.charAt() === "/" ? item.path.slice(1) : item.path;
    // console.log(path, pathnames[0]);
    if (path === pathnames[0]) {
      pathnames.shift();
      breadcrumbs.push(item);
      if (item.children) {
        generateBreadcrumbs(item.children, pathnames, breadcrumbs);
      }
      break;
    }
  }
};

const BreadcrumbNow = ({ data }) => {
  // console.log(data);
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const breadcrumbs = [];

  generateBreadcrumbs(data, pathnames, breadcrumbs);

  return (
    <Breadcrumb
      items={[
        { title: "首页" },
        ...breadcrumbs.map((item) => ({
          title: item.title,
        })),
      ]}
    ></Breadcrumb>
  );
};

export default BreadcrumbNow;
