import { Table, Input, Button, Tag, Modal, InputNumber } from "antd";
import {
  EditTwoTone,
  PlusOutlined,
  DeleteTwoTone,
  SearchOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import {
  businessBodypartsList,
  businessBodyparts,
  businessBodypartsIds,
} from "@/service";
import { useState, useEffect } from "react";
const columns = [
  {
    title: "ID",
    dataIndex: "ID",
  },
  {
    title: "部位",
    dataIndex: "bodytype",
  },
  {
    title: "排序ID",
    dataIndex: "vipod",
  },
  {
    title: "添加时间",
    dataIndex: "times",
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
const Bodyparts = () => {
  let [data, changes] = useState([]);
  let [inpuValue, valueChange] = useState("");
  let [topValue, topChange] = useState(0);
  const delite = (ids) => {
    businessBodypartsIds({ ids: ids })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };
  const treeData = (arr) => {
    let data = [];
    for (let i = 0; i < arr.length; i++) {
      data.push({
        key: i,
        ID: arr[i].id,
        bodytype: arr[i].bodypart,
        vipod: arr[i].orderNum,
        times: arr[i].create_time,
        operate: (
          <div className="flex justify-around cursor-pointer text-[#1677ff]">
            <span>
              <EditTwoTone />
              编辑
            </span>
            <span
              onClick={() => {
                delite(arr[i].id);
                // console.log(arr[i].id);
              }}
            >
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
    businessBodypartsList()
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    console.log(inpuValue);
    console.log(topValue);
    businessBodyparts({ bodypart: inpuValue, orderNum: topValue })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  // const onChange = (value) => {
  //   console.log("changed", value);
  // };
  // const addbodyparts = () => {
  //   console.log("123455");
  // };

  return (
    <>
      <div className="h-[80px] w-[100%]  flex items-center">
        <div className="w-[240px] flex justify-between items-center">
          <div>部位</div>
          <Input className="ml-[5px] w-[170px]" />
        </div>
        <Button type="primary" className="ml-[10px]" icon={<SearchOutlined />}>
          搜索
        </Button>
        <Button className="ml-[10px]" icon={<SyncOutlined />}>
          重置
        </Button>
      </div>
      <div className="flex items-center">
        {/* className="w-[60px] h-[30px] flex items-center justify-center" */}
        <Tag
          color="cyan"
          className="w-[60px] h-[30px] cursor-pointer flex items-center justify-center"
          icon={<PlusOutlined />}
          onClick={showModal}
        >
          新增
        </Tag>
        <Tag
          color="green"
          className="w-[60px] h-[30px] cursor-pointer flex items-center justify-center"
          icon={<EditTwoTone />}
        >
          修改
        </Tag>
      </div>
      <Modal
        title="添加部门"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        cancelText="取消"
        okText="确定"
      >
        <div className="flex items-center">
          <div>
            <span className=" text-[red]">*</span>部位
          </div>
          <Input
            placeholder="请输入部位"
            value={inpuValue}
            onChange={(e) => {
              // console.log(e.target.value);
              valueChange((inpuValue = e.target.value));
            }}
            className="ml-[10px] w-[400px]"
          />
        </div>
        <div className="flex items-center mt-[8px]">
          <div>排序id</div>
          <InputNumber
            min={0}
            defaultValue={topValue}
            onChange={(e) => {
              // console.log(e);
              topChange((topValue = e));
            }}
            className="ml-[10px]"
          />
        </div>
      </Modal>
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

export default Bodyparts;
