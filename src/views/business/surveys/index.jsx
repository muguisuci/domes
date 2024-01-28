import React from "react";
import {
  Table,
  Input,
  Button,
  Tag,
  //  Modal, InputNumber,
  Spin,
} from "antd";
import {
  EditTwoTone,
  PlusOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { businessSurveysList } from "@/service";
import { useState, useEffect } from "react";

const columns = [
  {
    title: "ID",
    dataIndex: "ID",
  },
  {
    title: "问卷调查标题",
    dataIndex: "title",
  },
  {
    title: "状态",
    dataIndex: "status",
  },
  {
    title: "开始时间",
    dataIndex: "starttime",
  },
  {
    title: "结束时间",
    dataIndex: "endtime",
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

const Surveys = () => {
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
        ID: arr[i].id,
        title: arr[i].title,
        status:
          arr[i].status === 0 ? (
            <Tag color="green">正常</Tag>
          ) : (
            <Tag color="red">停用</Tag>
          ),
        starttime: arr[i].start_time,
        endtime: arr[i].end_time,
        creattime: arr[i].create_time,
        operate: (
          <div className="flex justify-around cursor-pointer text-[#1677ff]">
            <span>
              <EditTwoTone />
              编辑问题
            </span>
            <span>
              <EyeOutlined />
              数据
            </span>
            <span>
              <EditTwoTone />
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
    businessSurveysList()
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
      <div className="h-[80px] w-[100%]  flex items-center">
        <div className="w-[240px] flex justify-between items-center">
          <div>问卷调查标题</div>
          <Input className="ml-[5px] w-[170px]" />
        </div>
        <Button type="primary" className="ml-[10px]" icon={<SearchOutlined />}>
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
      <div className="h-[60px] w-[100%]  flex items-center">
        <Tag
          color="blue"
          className="w-[60px] h-[30px] cursor-pointer flex items-center justify-center"
          icon={<PlusOutlined />}
          // onClick={showModal}
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
      </div>
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

      {/* ... */}
    </>
  );
};

export default Surveys;
