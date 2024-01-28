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
  DeleteOutlined,
  SearchOutlined,
  SyncOutlined,
  PlusOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { businessSurveysquestionList } from "@/service";
import { useState, useEffect } from "react";

const columns = [
  {
    title: "ID",
    dataIndex: "ID",
  },
  {
    title: "问题",
    dataIndex: "title",
  },
  {
    title: "题目类型",
    dataIndex: "types",
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
const problem = [
  {
    value: "0",
    label: "单选",
  },
  {
    value: "1",
    label: "多选",
  },
  {
    value: "2",
    label: "填空",
  },
];

const Surveysquestion = () => {
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
        types: problem[arr[i].qtype].label,
        operate: (
          <div className="flex justify-around cursor-pointer text-[#1677ff]">
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
    businessSurveysquestionList()
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
          <div>问题</div>
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

export default Surveysquestion;
