import {
  Table,
  // Select,
  Input,
  Button,
  Tag,
  // Modal,
  // InputNumber,
  // Switch,
  // Radio,
} from "antd";
import {
  EditTwoTone,
  DeleteTwoTone,
  SearchOutlined,
  SyncOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { businessCard } from "@/service";
import { useState, useEffect } from "react";

const columns = [
  {
    title: "ID",
    dataIndex: "ID",
  },
  {
    title: "卡号",
    dataIndex: "order",
  },
  {
    title: "卡类型",
    dataIndex: "money",
  },
  {
    title: "用户id",
    dataIndex: "ordertype",
  },
  {
    title: "绑定时间",
    dataIndex: "vipod",
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
const Cards = () => {
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
    businessCard()
      .then((res) => {
        // console.log(res.data.data.result);
        changes(treeData(res.data.data.result));
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getFund();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className="h-[80px] w-[100%]  flex items-center">
        <div className="w-[240px] flex justify-between items-center">
          <div>卡号</div>
          <Input className="ml-[5px] w-[170px]" />
        </div>
        <Button type="primary" className="ml-[10px]" icon={<SearchOutlined />}>
          搜索
        </Button>
        <Button className="ml-[10px]" icon={<SyncOutlined />}>
          重置
        </Button>
      </div>
      <Tag
        color="red"
        className="ml-[10px] cursor-pointer"
        icon={<DeleteOutlined />}
      >
        解绑
      </Tag>
      <Table
        rowSelection={{
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
        className="mt-[10px]"
      />
    </>
  );
};

export default Cards;
