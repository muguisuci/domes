import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import addDynamicRoutes from "@/unitls/dynamic.routes";
import BreadcrumbNow from "@/component/BreadcrumbNow";
const { Header, Sider, Content } = Layout;
const Index = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const treeData = (arr) => {
    let data = [];
    for (let i = 0; i < arr.length; i++) {
      // console.log(arr[i].meta.title);
      data.push({
        label: arr[i].meta.title,
        key: arr[i].path,
        path: arr[i].path,
        title: arr[i].meta.title,
        children: arr[i].children ? treeData(arr[i].children) : null,
      });
    }
    return data;
  };
  const trees = JSON.parse(localStorage.Layout);
  // console.log(trees);
  addDynamicRoutes(trees);
  const items = treeData(trees);
  // console.log(items);
  const navigate = useNavigate();
  function toRouter(e) {
    // console.log(e);
    if (e.keyPath[0][0] === "/") {
      let url = e.keyPath[1] + e.keyPath[0];
      // console.log(url);
      navigate(url);
    } else {
      if (e.keyPath[2]) {
        let url = e.keyPath[2] + "/" + e.keyPath[1] + "/" + e.keyPath[0];
        // console.log(url);
        navigate(url);
      } else {
        let url = e.keyPath[1] + "/" + e.keyPath[0];
        // console.log(url);
        navigate(url);
      }
    }
  }

  return (
    <>
      <Layout className="h-[100%]">
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical h-[32px] m-[16px] flex justify-between overflow-hidden">
            <img
              src="https://pe.xzzl120.com/assets/logo.1c4bdeb5.png"
              alt=""
              className=" rounded-[50%]"
            />
            <span className="text-[#fff] text-center">西藏阜康肿瘤医院</span>
          </div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={items}
            onClick={toRouter}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
            className="flex items-center"
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
            <div>
              <BreadcrumbNow data={items} />
            </div>
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <div className="h-[100vh]">
              <Outlet></Outlet>
            </div>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};
export default Index;
