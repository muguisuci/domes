import { Select, Input, Button, DatePicker, Divider, Table } from "antd";
import { SearchOutlined, SyncOutlined, DeleteTwoTone } from "@ant-design/icons";
import React from "react";
import { businessPayorder } from "@/service";
const { RangePicker } = DatePicker;
const columns = [
  {
    title: "微信订单号",
    dataIndex: "wcrder",
  },
  {
    title: "订单号",
    dataIndex: "order",
  },
  {
    title: "金额",
    dataIndex: "money",
  },
  {
    title: "订单类型",
    dataIndex: "ordertype",
  },
  {
    title: "会员id",
    dataIndex: "vipod",
  },
  {
    title: "时间",
    dataIndex: "times",
  },
  {
    title: "操作",
    dataIndex: "operate",
  },
];
const data = [
  {
    key: "1",
    wcrder: "Jo",
    order: 32,
    money: "New York ",
    ordertype: "111",
    vipod: "222",
    times: "3:22",
    operate: (
      <span className="text-[#1677ff]">
        <DeleteTwoTone />
        删除
      </span>
    ),
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
const Payorder = () => {
  businessPayorder()
    .then((res) => {
      console.log(res.data.data);
    })
    .catch((err) => console.log(err));
  return (
    <>
      <div className="h-[80px] w-[100%]  flex items-center">
        <div className="w-[240px] flex  items-center">
          <div>微信订单号</div>
          <Input className="ml-[5px] w-[130px]" />
        </div>
        <div className="w-[240px] flex  items-center">
          <div>订单号</div>
          <Input className="ml-[5px] w-[130px]" />
        </div>
        <div className="ml-[10px]">
          订单类型
          <Select
            defaultValue="请选择"
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
      <div>
        <Divider />

        <Table
          rowSelection={{
            ...rowSelection,
          }}
          columns={columns}
          dataSource={data}
        />
      </div>
    </>
  );
};

export default Payorder;
