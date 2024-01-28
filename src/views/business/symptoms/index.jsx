import { Table, Input, Button, Tag, Modal, Select } from "antd";
import {
  EditTwoTone,
  PlusOutlined,
  DeleteTwoTone,
  SearchOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { businessSymptomsList, businessSymptoms } from "@/service";
import { useState, useEffect } from "react";
const columns = [
  {
    title: "ID",
    dataIndex: "ID",
  },
  {
    title: "适用性别",
    dataIndex: "bodytype",
  },
  {
    title: "身体部位",
    dataIndex: "vipod",
  },
  {
    title: "症状",
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
const Symptoms = () => {
  let [data, changes] = useState([]);
  let [inpuValue, valueChange] = useState("");
  let [sexValue, sexChange] = useState("");
  let [bodyValue, bodyChange] = useState("");
  function sexs(sexisd) {
    if (sexisd === "0") {
      return "女";
    } else if (sexisd === "1") {
      return "男";
    } else {
      return "全部";
    }
  }

  const treeData = (arr) => {
    let data = [];
    for (let i = 0; i < arr.length; i++) {
      data.push({
        key: i,
        ID: arr[i].id,
        bodytype: sexs(arr[i].sex),
        vipod: arr[i].partId,
        times: arr[i].symptom,
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
    businessSymptomsList()
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
    console.log(bodyValue);
    businessSymptoms({ sex: sexValue, symptom: inpuValue })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <div className="h-[80px] w-[100%]  flex items-center">
        <div className="w-[240px] flex justify-between items-center">
          <div>症状</div>
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
        <div className="mt-[10px] flex items-center">
          <div>
            <span className=" text-[red]">*</span>适用性别：
          </div>
          <Select
            placeholder="请选择"
            className="w-[140px]"
            options={[
              {
                value: "0",
                label: "男",
              },
              {
                value: "1",
                label: "女",
              },
              {
                value: "2",
                label: "全部",
              },
            ]}
            onChange={(e) => {
              console.log(e);
              sexChange((sexValue = e));
            }}
          />
        </div>
        <div className="mt-[10px] flex items-center">
          <div>
            <span className=" text-[red]">*</span>身体部位：
          </div>
          <Select
            placeholder="请选择"
            className="w-[140px]"
            options={[
              {
                value: "头部",
                label: "头部",
              },
              {
                value: "颈椎",
                label: "颈椎",
              },
              {
                value: "膝盖",
                label: "膝盖",
              },
            ]}
            onChange={(e) => {
              console.log(e);
              bodyChange((bodyValue = e));
            }}
          />
        </div>
        <div className="mt-[10px] flex items-center">
          <div>
            <span className=" text-[red]">*</span>症状
          </div>
          <Input
            placeholder="请输入症状"
            value={inpuValue}
            onChange={(e) => {
              // console.log(e.target.value);
              valueChange((inpuValue = e.target.value));
            }}
            className="ml-[10px] w-[400px]"
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

export default Symptoms;
