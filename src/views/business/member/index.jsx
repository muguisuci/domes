import React, { useState, useEffect } from "react";
import { Select, Input, Button, DatePicker, Spin, Table, Tag } from "antd";
import {
  DeleteOutlined,
  SearchOutlined,
  SyncOutlined,
  EditOutlined,
  PlusOutlined,
  VerticalAlignBottomOutlined,
} from "@ant-design/icons";
import { businessMemberList } from "@/service";
const { RangePicker } = DatePicker;
const columns = [
  {
    title: "用户ID",
    dataIndex: "ID",
  },
  {
    title: "手机",
    dataIndex: "phone",
  },
  {
    title: "昵称",
    dataIndex: "nickname",
  },
  {
    title: "姓名",
    dataIndex: "name",
  },
  {
    title: "地区",
    dataIndex: "curtey",
  },
  {
    title: "openid",
    dataIndex: "openid",
  },
  {
    title: "unionid",
    dataIndex: "unionid",
  },
  {
    title: "图片",
    dataIndex: "imgs",
  },
  {
    title: "注册类型",
    dataIndex: "zhuctype",
  },
  {
    title: "创建时间",
    dataIndex: "creattime",
  },
  {
    title: "操作",
    dataIndex: "operate",
  },
];
const rowSelection = {
  getCheckboxProps: (record) => ({
    disabled: record.name === "Disabled User",
    // Column configuration not to be checked
    name: record.name,
  }),
};

const Member = () => {
  let [data, changes] = useState([]);
  const [spinning, setSpinning] = React.useState(false);
  const showLoader = () => {
    setSpinning(true);
    setTimeout(() => {
      setSpinning(false);
    }, 3000);
  };
  const treeData = (arr) => {
    let data = [];
    for (let i = 0; i < arr.length; i++) {
      data.push({
        key: i,
        ID: arr[i].userId,
        phone: "",
        nickname: arr[i].nickname,
        name: arr[i].userName,
        curtey: "地区",
        openid: arr[i].openid,
        unionid: arr[i].unionid,
        imgs: <img src={arr[i].headimgurl} alt="" />,
        zhuctype: arr[i].regtype,
        creattime: arr[i].create_time,
        operate: (
          <div className="flex justify-around cursor-pointer text-[#1677ff]">
            <span>
              <EditOutlined />
              编辑
            </span>
            <span
              onClick={() => {
                console.log(arr[i].id);
              }}
            >
              <DeleteOutlined />
              删除
            </span>
          </div>
        ),
      });
    }
    return data;
  };
  const getFund = () => {
    businessMemberList()
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
  return (
    <>
      <div className="h-[80px] w-[100%]  flex items-center justify-between">
        <div className="flex items-center">
          <div>手机</div>
          <Input className="ml-[5px] w-[150px]" />
        </div>
        <div className="flex items-center">
          <div>昵称</div>
          <Input className="ml-[5px] w-[150px]" />
        </div>
        <div className="ml-[10px]">
          地区
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
        <div>
          注册时间
          <RangePicker showTime className="ml-[5px]" />
        </div>
      </div>
      <div className="flex">
        <Button type="primary" className="ml-[20px]" icon={<SearchOutlined />}>
          搜索
        </Button>
        <Button
          className="ml-[10px]"
          icon={<SyncOutlined />}
          onClick={showLoader}
        >
          重置
        </Button>
      </div>
      <div className="flex items-center mt-[10px]">
        <Tag
          color="cyan"
          className="w-[60px] h-[30px] cursor-pointer flex items-center justify-center"
          icon={<PlusOutlined />}
        >
          新增
        </Tag>
        <Tag
          color="green"
          className="w-[60px] h-[30px] cursor-pointer flex items-center justify-center"
          icon={<EditOutlined />}
        >
          修改
        </Tag>
        <Tag
          color="cyan"
          className="w-[60px] h-[30px] cursor-pointer flex items-center justify-center"
          icon={<DeleteOutlined />}
        >
          删除
        </Tag>
        <Tag
          color="red"
          className="w-[60px] h-[30px] cursor-pointer flex items-center justify-center"
          icon={<VerticalAlignBottomOutlined />}
        >
          导出
        </Tag>
      </div>
      <h1>用户管理</h1>
      <Spin spinning={spinning}>
        <Table
          rowSelection={{
            ...rowSelection,
          }}
          columns={columns}
          dataSource={data}
          className="mt-[20px]"
        />
      </Spin>
    </>
  );
};

export default Member;
