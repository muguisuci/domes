import { systemDeptList, systemDeptTreeselect } from "@/service";
import {
  Table,
  Select,
  Input,
  Button,
  Tag,
  Modal,
  InputNumber,
  // Form,
} from "antd";
import {
  EditTwoTone,
  PlusOutlined,
  DeleteTwoTone,
  SearchOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { useState, useEffect } from "react";
const columns = [
  {
    title: "部门名称",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "负责人",
    dataIndex: "headpeop",
    key: "headpeop",
  },
  {
    title: "排序",
    dataIndex: "sort",
    key: "sort",
  },
  {
    title: "状态",
    dataIndex: "state",
    key: "state",
  },
  {
    title: "创建时间",
    dataIndex: "Creationtime",
    key: "Creationtime",
  },
  {
    title: "操作",
    dataIndex: "operate",
    key: "operate",
  },
];
const Dept = () => {
  let [data, changes] = useState([]);
  const treeDataes = (res, tree) => {
    let dataes = [];

    for (let i = 0; i < tree.length; i++) {
      for (let j = 0; j < res.length; j++) {
        // console.log(res[i].deptName);
        if (tree[i].id === res[j].deptId) {
          dataes.push({
            key: j,
            name: res[j].deptName,
            headpeop: res[j].leader,
            sort: res[j].orderNum,
            state:
              res[j].status === "0" ? (
                <Tag color="cyan">正常</Tag>
              ) : (
                <Tag color="red">停用</Tag>
              ),
            Creationtime: res[j].createTime,
            children: tree[i].children
              ? treeDataes(res, tree[i].children)
              : null,
            operate: (
              <div className="flex justify-around cursor-pointer text-[#1677ff]">
                <span>
                  <EditTwoTone />
                  修改
                </span>
                <span>
                  <PlusOutlined />
                  新增
                </span>
                <span
                  onClick={() => {
                    // delice(arr[i].deptId);
                    console.log(res[j].deptId);
                  }}
                >
                  <DeleteTwoTone />
                  删除
                </span>
              </div>
            ),
          });
        }
      }
    }
    return dataes;
  };
  const gettrees = async () => {
    const list = await systemDeptList();
    const treeslist = await systemDeptTreeselect();
    const listres = list.data.data;
    const treeres = treeslist.data.data;
    // changes(treeData(treeres));
    changes(treeDataes(listres, treeres));
    // treeDataes(listres, treeres);
    // console.log(listres);
    // console.log(treeres);
  };
  useEffect(() => {
    gettrees();
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
    <>
      <div className="h-[80px] w-[100%]  flex items-center">
        <div className="w-[240px] flex justify-between items-center">
          <div>部门名称</div>
          <Input placeholder="请输入部门名称" className="ml-[5px] w-[170px]" />
        </div>
        <div className="ml-[10px]">
          状态
          <Select
            defaultValue="部门状态"
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
      <div>
        <Tag
          color="cyan"
          className="ml-[10px]"
          icon={<PlusOutlined />}
          onClick={showModal}
        >
          新增
        </Tag>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        className="mt-[20px] text-center"
      />
      <Modal
        title="添加部门"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        cancelText="取消"
        okText="确定"
      >
        <div className="w-[100%] ">
          <div className=" w-[100%] flex items-center">
            上级部门
            <Select
              defaultValue="选择上级部门"
              className="ml-[10px] w-[400px]"
              options={[]}
            />
          </div>
          <div className="flex items-center mt-[10px]">
            <div className="w-[220px] flex justify-between items-center">
              <div>部门名称</div>
              <Input
                placeholder="请输入部门名称"
                className="ml-[5px] w-[150px]"
              />
            </div>
            <div className="w-[220px] ml-[10px] flex justify-between items-center">
              <div>显示排序</div>
              <InputNumber
                min={1}
                defaultValue={1}
                className="ml-[5px] w-[150px]"
              />
            </div>
          </div>
          <div className="flex items-center mt-[10px]">
            <div className="w-[220px] flex justify-between items-center">
              <div>负责人</div>
              <Input
                placeholder="请输入负责人"
                className="ml-[5px] w-[150px]"
              />
            </div>
            <div className="w-[220px] ml-[10px] flex justify-between items-center">
              <div>联系电话</div>
              <Input
                placeholder="请输入联系电话"
                className="ml-[5px] w-[150px]"
              />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Dept;
