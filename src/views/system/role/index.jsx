import {
  Table,
  Select,
  Input,
  Button,
  Tag,
  Modal,
  InputNumber,
  Switch,
  Radio,
} from "antd";
import {
  EditTwoTone,
  PlusOutlined,
  DeleteTwoTone,
  SearchOutlined,
  SyncOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { useState, useEffect } from "react";
import { systemRoleList } from "@/service";
const { TextArea } = Input;
const columns = [
  {
    title: "编号",
    dataIndex: "ID",
  },
  {
    title: "名称",
    dataIndex: "name",
  },
  {
    title: "权限字符",
    dataIndex: "permission",
  },
  {
    title: "状态",
    dataIndex: "state",
  },
  {
    title: "创建时间",
    dataIndex: "creatime",
  },
  {
    title: "操作",
    dataIndex: "operate",
  },
];
const data = [
  {
    key: "1",
    ID: "1",
    name: 32,
    permission: "admin",
    state: <Switch defaultChecked />,
    creatime: "222",
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
        <span>
          <CheckCircleOutlined />
          数据权限
        </span>
      </div>
    ),
  },
];
const Role = () => {
  let [data, changes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const treeData = (arr) => {
    let data = [];
    for (let i = 0; i < arr.length; i++) {
      data.push({
        key: i,
        ID: arr[i].roleId,
        name: arr[i].roleName,
        permission: arr[i].roleKey,
        state: <Switch defaultChecked />,
        creatime: arr[i].createTime,
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
            <span>
              <CheckCircleOutlined />
              数据权限
            </span>
          </div>
        ),
      });
    }
    return data;
  };

  const gettrees = async () => {
    const list = await systemRoleList();
    const listres = list.data.data.result;
    changes(treeData(listres));
    console.log(listres);
  };
  useEffect(() => {
    gettrees();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [value, setValue] = useState(1);
  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  return (
    <>
      <div className="h-[80px] w-[100%]  flex items-center">
        <div className="w-[240px] flex justify-between items-center">
          <div>角色名称</div>
          <Input placeholder="请输入角色名称" className="ml-[5px] w-[170px]" />
        </div>
        <div className="ml-[10px]">
          角色状态
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
        <Button type="primary" className="ml-[10px]" icon={<SearchOutlined />}>
          搜索
        </Button>
        <Button className="ml-[10px]" icon={<SyncOutlined />}>
          重置
        </Button>
      </div>
      <Tag
        color="cyan"
        className="ml-[10px] cursor-pointer"
        icon={<PlusOutlined />}
        onClick={showModal}
      >
        新增
      </Tag>
      <Modal
        title="添加角色"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        cancelText="取消"
        okText="确定"
      >
        <div className="w-[100%] ">
          <div className="w-[100%] mt-[10px] flex items-center">
            <div>角色名称</div>
            <Input
              placeholder="请输入角色名称"
              className="ml-[10px] w-[400px]"
            />
          </div>
          <div className="w-[100%] mt-[10px] flex items-center">
            <div>权限字符</div>
            <Input
              placeholder="请输入权限字符"
              className="ml-[10px] w-[400px]"
            />
          </div>
          <div className="w-[100%] mt-[10px] flex items-center">
            <div>角色顺序</div>
            <InputNumber
              min={0}
              defaultValue={0}
              className="ml-[10px] w-[140px]"
            />
          </div>
          <div className="w-[100%] mt-[10px] flex items-center">
            <div className="w-[56px]">状态</div>
            <Radio.Group
              onChange={onChange}
              value={value}
              className="ml-[10px]"
            >
              <Radio value={1}>正常</Radio>
              <Radio value={2}>停用</Radio>
            </Radio.Group>
          </div>
          <div className="w-[100%] mt-[10px] flex items-center">
            <div className="w-[56px] ">备注</div>
            <TextArea placeholder="请输入内容" className="ml-[10px]" />
          </div>
        </div>
      </Modal>
      <Table columns={columns} dataSource={data} className="mt-[10px]" />
    </>
  );
};

export default Role;
