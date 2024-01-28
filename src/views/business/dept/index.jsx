import { Input, Button, Modal, Table, InputNumber, Select, Tag } from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  SyncOutlined,
  DeleteTwoTone,
  EditTwoTone,
} from "@ant-design/icons";
import React from "react";
import { businessDept } from "@/service";
import { useState, useEffect } from "react";
const columns = [
  {
    title: "ID",
    dataIndex: "ID",
  },
  {
    title: "科室代码",
    dataIndex: "order",
  },
  {
    title: "科室名称",
    dataIndex: "money",
  },
  {
    title: "科室位置",
    dataIndex: "ordertype",
  },
  {
    title: "排序ID",
    dataIndex: "vipod",
  },
  {
    title: "科室类型",
    dataIndex: "times",
  },
  {
    title: "操作",
    dataIndex: "operate",
  },
];
// const data = [
//   {
//     key: "1",
//     ID: "Jo",
//     order: 32,
//     money: "New York ",
//     ordertype: "111",
//     vipod: "222",
//     times: "3:22",
//     operate: (
//       <div className="flex justify-around cursor-pointer text-[#1677ff]">
//         <span>
//           <EditTwoTone />
//           编辑
//         </span>
//         <span>
//           <DeleteTwoTone />
//           删除
//         </span>
//       </div>
//     ),
//   },
// ];
const rowSelection = {
  getCheckboxProps: (record) => ({
    disabled: record.name === "Disabled User",
    name: record.name,
  }),
};
const Dept = () => {
  let [data, changes] = useState([]);
  const treeData = (arr) => {
    let data = [];
    for (let i = 0; i < arr.length; i++) {
      data.push({
        key: i,
        ID: arr[i].id,
        order: arr[i].deptCode,
        money: arr[i].deptName,
        ordertype: arr[i].position,
        vipod: arr[i].orderNum,
        times: arr[i].deptType,
        operate: (
          <div className="flex justify-around cursor-pointer text-[#1677ff]">
            <span>
              <EditTwoTone />
              编辑
            </span>
            <span>
              <DeleteTwoTone />
              删除
            </span>
          </div>
        ),
      });
    }
    return data;
  };
  const getFund = () => {
    businessDept()
      .then((res) => {
        console.log(res.data.data.result);
        changes(treeData(res.data.data.result));
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getFund();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <div className="h-[80px] w-[100%]  flex items-center">
        <div className="w-[240px] flex justify-between items-center">
          <div>科室代码</div>
          <Input className="ml-[5px] w-[170px]" />
        </div>
        <div className="w-[240px] ml-[10px] flex justify-between items-center">
          <div>科室名称</div>
          <Input className="ml-[5px] w-[170px]" />
        </div>

        <Button type="primary" className="ml-[10px]" icon={<SearchOutlined />}>
          搜索
        </Button>
        <Button className="ml-[10px]" icon={<SyncOutlined />}>
          重置
        </Button>
      </div>
      <div>
        <Tag
          color="cyan"
          className="w-[60px] h-[30px] cursor-pointer flex items-center justify-center"
          icon={<PlusOutlined />}
          onClick={showModal}
        >
          新增
        </Tag>
      </div>
      <Modal
        title="添加"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        cancelText="取消"
        okText="确定"
      >
        <div className="w-[100%] ">
          <div className="w-[100%] mt-[10px] flex items-center">
            <div>科室代码</div>
            <Input
              placeholder="请输入科室代码"
              className="ml-[10px] w-[400px]"
            />
          </div>
          <div className="w-[100%] mt-[10px] flex items-center">
            <div>科室名称</div>
            <Input
              placeholder="请输入科室名称"
              className="ml-[10px] w-[400px]"
            />
          </div>
          <div className="w-[100%] mt-[10px] flex items-center">
            <div>排序id</div>
            <InputNumber
              min={0}
              defaultValue={0}
              className="ml-[10px] w-[140px]"
            />
          </div>
          <div className="w-[100%] mt-[10px] flex items-center">
            <div>科室类型</div>
            <Select
              defaultValue="角色状态"
              className="ml-[10px]"
              options={[
                {
                  value: "正常",
                  label: "正常",
                },
                {
                  value: "停用",
                  label: "停用",
                },
              ]}
            />
          </div>
        </div>
      </Modal>
      <Table
        rowSelection={{
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
        className="mt-[10px]"
      />
    </div>
  );
};

export default Dept;
