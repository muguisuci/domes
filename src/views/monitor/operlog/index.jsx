import { useState, useEffect } from "react";
import { Select, Input, Button, DatePicker, Divider, Table, Tag } from "antd";
import {
  DeleteOutlined,
  SearchOutlined,
  SyncOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { monitorOperlogList } from "@/service";
const { RangePicker } = DatePicker;
const columns = [
  {
    title: "日志编号",
    dataIndex: "ID",
  },
  {
    title: "系统模块",
    dataIndex: "modules",
  },
  {
    title: "请求方式",
    dataIndex: "request",
  },
  {
    title: "操作人员",
    dataIndex: "operator",
  },
  {
    title: "主机",
    dataIndex: "host",
  },
  {
    title: "操作地点",
    dataIndex: "operation",
  },
  {
    title: "操作状态",
    dataIndex: "operatetype",
  },
  {
    title: "用时",
    dataIndex: "usetimes",
  },
  {
    title: "日志内容",
    dataIndex: "content",
  },
  {
    title: "操作日期",
    dataIndex: "days",
  },
  {
    title: "操作",
    dataIndex: "operate",
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
const Operlog = () => {
  let [data, changes] = useState([]);
  const treeData = (arr) => {
    let data = [];
    for (let i = 0; i < arr.length; i++) {
      data.push({
        key: i,
        ID: arr[i].operId,
        modules: arr[i].operUrl,
        request: arr[i].requestMethod,
        operator: arr[i].operName,
        host: arr[i].operIp,
        operation: arr[i].operLocation,
        operatetype: arr[i].status,
        usetimes: "0ms",
        content: arr[i].title,
        days: arr[i].operTime,
        operate: (
          <div className="flex justify-around cursor-pointer text-[#1677ff]">
            <span>
              <EyeOutlined />
              详情
            </span>
          </div>
        ),
      });
    }
    return data;
  };
  const getFund = () => {
    monitorOperlogList()
      .then((res) => {
        // console.log(res.data.data.result);
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
          <div>系统模块</div>
          <Input placeholder="请输入系统模块" className="ml-[5px] w-[130px]" />
        </div>
        <div className="w-[240px] flex  items-center">
          <div>操作人员</div>
          <Input placeholder="请输入操作人员" className="ml-[5px] w-[130px]" />
        </div>
        <div className="ml-[10px]">
          类型
          <Select
            defaultValue="操作类型"
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
        <div className="ml-[10px]">
          状态
          <Select
            defaultValue="操作状态"
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
      </div>
      <div className="flex">
        <div>
          日期
          <RangePicker showTime className="ml-[5px]" />
        </div>
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

export default Operlog;
