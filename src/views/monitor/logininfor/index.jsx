import { useState, useEffect } from "react";
import { Select, Input, Button, DatePicker, Table, Tag } from "antd";
import {
  DeleteOutlined,
  SearchOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { monitorLogininforList } from "@/service";
const { RangePicker } = DatePicker;
const columns = [
  {
    title: "访问编号",
    dataIndex: "ID",
  },
  {
    title: "用户名称",
    dataIndex: "username",
  },
  {
    title: "登录地址",
    dataIndex: "address",
  },
  {
    title: "登录地点",
    dataIndex: "location",
  },
  {
    title: "浏览器",
    dataIndex: "browser",
  },
  {
    title: "操作系统",
    dataIndex: "operating",
  },
  {
    title: "登录状态",
    dataIndex: "status",
  },
  {
    title: "操作信息",
    dataIndex: "information",
  },
  {
    title: "登录日期",
    dataIndex: "logintime",
  },
];
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
  getCheckboxProps: (record) => ({
    disabled: record.name === "Disabled User",
    // Column configuration not to be checked
    name: record.name,
  }),
};
const Logininfor = () => {
  let [data, changes] = useState([]);
  const treeData = (arr) => {
    let data = [];
    for (let i = 0; i < arr.length; i++) {
      data.push({
        key: i,
        ID: arr[i].infoId,
        username: arr[i].userName,
        address: arr[i].ipaddr,
        location: arr[i].loginLocation,
        browser: arr[i].browser,
        operating: arr[i].os,
        status: arr[i].status,
        information: arr[i].msg,
        logintime: arr[i].loginTime,
      });
    }
    return data;
  };
  const getFund = () => {
    monitorLogininforList()
      .then((res) => {
        console.log(res.data.data.result);
        changes(treeData(res.data.data.result));
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getFund();
  }, []);
  return (
    <>
      <div className="h-[80px] w-[100%]  flex items-center">
        <div className="w-[240px] flex  items-center">
          <div>登录地址</div>
          <Input placeholder="请输入登录地址" className="ml-[5px] w-[130px]" />
        </div>
        <div className="w-[240px] flex  items-center">
          <div>用户名称</div>
          <Input placeholder="请输入用户名称" className="ml-[5px] w-[130px]" />
        </div>
        <div className="ml-[10px]">
          状态
          <Select
            defaultValue="登录状态"
            className="ml-[10px]"
            options={[
              {
                value: "挂号",
                label: "挂号",
              },
              {
                value: "停用",
                label: "停用",
              },
            ]}
          />
        </div>
        <div>
          日期
          <RangePicker showTime className="ml-[5px]" />
        </div>
      </div>
      <div className="flex">
        <Button type="primary" className="ml-[20px]" icon={<SearchOutlined />}>
          搜索
        </Button>
        <Button className="ml-[10px]" icon={<SyncOutlined />}>
          重置
        </Button>
      </div>
      <div className="flex items-center mt-[10px]">
        <Tag
          color="red"
          className="w-[60px] h-[30px] cursor-pointer flex items-center justify-center"
          icon={<DeleteOutlined />}
        >
          删除
        </Tag>
        <Tag
          color="red"
          className="w-[60px] h-[30px] cursor-pointer flex items-center justify-center"
          icon={<DeleteOutlined />}
        >
          清空
        </Tag>
      </div>
      {/* <h1>操作日志</h1> */}
      <Table
        rowSelection={{
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
        className="mt-[20px]"
      />
    </>
  );
};

export default Logininfor;
