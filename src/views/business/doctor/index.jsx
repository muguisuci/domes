import React, { useState, useEffect } from "react";
import {
  Select,
  Input,
  Button,
  Table,
  Spin,
  Tag,
  Modal,
  Form,
  Upload,
  InputNumber,
  message,
} from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  SearchOutlined,
  SyncOutlined,
  EditOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import {
  businessDoctorList,
  //  businessDoctor
} from "@/service";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
// import { Editor } from "@tinymce/tinymce-react";
const columns = [
  {
    title: "ID",
    dataIndex: "ID",
  },
  {
    title: "专家名称",
    dataIndex: "doctorname",
  },
  {
    title: "职称",
    dataIndex: "title",
  },
  {
    title: "医生代码",
    dataIndex: "doctorcode",
  },
  {
    title: "排序ID",
    dataIndex: "ordernum",
  },
  {
    title: "头像",
    dataIndex: "images",
  },
  {
    title: "科室",
    dataIndex: "deptid",
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

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};
const Doctor = () => {
  let [data, changes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [imageUrles, imagevalue] = useState("");
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
        doctorname: arr[i].doctorName,
        title: arr[i].title,
        doctorcode: arr[i].doctorCode,
        ordernum: arr[i].orderNum,
        images: (
          <img src={arr[i].images} alt="" className="w-[100px] h-[100px]" />
        ),
        deptid: arr[i].deptid,
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
    businessDoctorList()
      .then((res) => {
        console.log(res.data.data.result);
        changes(treeData(res.data.data.result));
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getFund();
    axios
      .get("http://192.168.68.174:8081/upload/token")
      .then((res) => {
        localStorage.setItem("uploadToken", JSON.stringify(res.data.result));
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    const imgs = `${JSON.parse(localStorage.uploadToken).baseURL}${imageUrles}`;
    console.log(imgs);
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    const form = new FormData();
    form.append("key", uuidv4());
    form.append("file", info.file.originFileObj);
    form.append("token", JSON.parse(localStorage.uploadToken).uploadToken);
    axios.post("https://upload-z2.qiniup.com ", form).then((res) => {
      // console.log(res.data.key);
      imagevalue(res.data.key);
    });
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      ></div>
    </button>
  );

  return (
    <>
      <div className="h-[80px] w-[100%]  flex items-center">
        <div className="w-[280px] flex  items-center">
          <div>专家名称</div>
          <Input className="ml-[5px] w-[160px]" />
        </div>
        <div className="w-[280px] flex  items-center">
          <div>医生代码</div>
          <Input className="ml-[5px] w-[160px]" />
        </div>
        <div className="ml-[10px]">
          科室
          <Select
            defaultValue="请选择"
            className="ml-[10px] w-[130px]"
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
      <div className="flex items-center">
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
        <Form
          layout="horizontal"
          style={{
            maxWidth: 600,
          }}
        >
          <Form.Item label="专家名称">
            <Input placeholder="请输入专家名称" />
          </Form.Item>
          <Form.Item label="职称">
            <Input placeholder="请输入职称" />
          </Form.Item>
          <Form.Item label="医生代码">
            <Input placeholder="请输入医生代码" />
          </Form.Item>
          <Form.Item label="擅长">
            <Input placeholder="请输入擅长" />
          </Form.Item>
          <Form.Item label="排序ID">
            <InputNumber />
          </Form.Item>
          <Form.Item label="头像">
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
              beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="avatar"
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                />
              ) : (
                uploadButton
              )}
            </Upload>
          </Form.Item>
          <Form.Item label="科室">
            <Select
              defaultValue="请选择"
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
          </Form.Item>
          <Form.Item label="简介"></Form.Item>
        </Form>
      </Modal>
      <h1>专家管理</h1>
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

export default Doctor;
