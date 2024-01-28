import {
  Button,
  Modal,
  Table,
  Tag,
  Select,
  Slider,
  message,
  Upload,
  Spin,
} from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  SyncOutlined,
  DeleteOutlined,
  EditTwoTone,
  LoadingOutlined,
} from "@ant-design/icons";
import { businessFoordataList, businessFoordata } from "@/service";
import { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import React from "react";
const columns = [
  {
    title: "ID",
    dataIndex: "ID",
  },
  {
    title: "建筑物名",
    dataIndex: "bodytype",
  },
  {
    title: "楼层",
    dataIndex: "vipod",
  },
  {
    title: "创建时间",
    dataIndex: "times",
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
const position = [
  {
    value: "0",
    label: "门诊大楼",
  },
  {
    value: "1",
    label: "住院部",
  },
  {
    value: "2",
    label: "急诊楼",
  },
  {
    value: "3",
    label: "医技楼",
  },
  {
    value: "4",
    label: "手术科",
  },
  {
    value: "5",
    label: "放射科",
  },
  {
    value: "6",
    label: "门诊药房",
  },
  {
    value: "7",
    label: "住院药房",
  },
];

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

const Floordata = () => {
  let [data, changes] = useState([]);
  let [inpuValue, valueChange] = useState("");
  let [foolValue, foolChange] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [imageUrles, imagevalue] = useState("");
  const treeData = (arr) => {
    let data = [];
    for (let i = 0; i < arr.length; i++) {
      data.push({
        key: i,
        ID: arr[i].id,
        bodytype: position[arr[i].building]
          ? position[arr[i].building].label
          : "其他",
        vipod: arr[i].floor,
        times: arr[i].create_time,
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
    businessFoordataList()
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
        // console.log(res.data.result);
        localStorage.setItem("uploadToken", JSON.stringify(res.data.result));
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
      console.log(res.data.key);
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    const imgs = `${JSON.parse(localStorage.uploadToken).baseURL}${imageUrles}`;
    businessFoordata({ building: inpuValue, floor: foolValue, planurl: imgs })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [spinning, setSpinning] = React.useState(false);
  const showLoader = () => {
    setSpinning(true);
    setTimeout(() => {
      setSpinning(false);
    }, 3000);
  };
  return (
    <>
      <div className="h-[60px] w-[100%]  flex items-center">
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
        <Tag
          color="red"
          className="w-[60px] h-[30px] cursor-pointer flex items-center justify-center"
          icon={<DeleteOutlined />}
        >
          删除
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
        <div className="flex items-center">
          <div className="w-[62px]">
            <span className=" text-[red] ">*</span>建筑物名
          </div>
          <Select
            placeholder="请选择"
            className="w-[150px] ml-[5px]"
            options={position}
            onChange={(e) => {
              // console.log(e.target.value);
              valueChange((inpuValue = e));
            }}
          />
        </div>
        <div className="flex ">
          <div className="w-[62px]">
            <span className=" text-[red] ">*</span>楼层
          </div>
          <div className="h-[100px]">
            <Slider
              vertical
              defaultValue={0}
              max="10"
              onChange={(e) => {
                // console.log(e);
                foolChange((foolValue = e));
              }}
            />
          </div>
        </div>
        <div className="flex mt-[20px]">
          <div className="w-[62px]">
            <span className=" text-[red] ">*</span>平面图
          </div>
          <div>
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
          </div>
        </div>
      </Modal>
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

export default Floordata;
