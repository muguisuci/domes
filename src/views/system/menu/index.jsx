import { Select, Input, Button } from "antd";
import { SearchOutlined, SyncOutlined } from "@ant-design/icons";
const Menu = () => {
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  return (
    <div>
      <div className="h-[80px] w-[100%]  flex items-center">
        <div className="w-[240px] flex justify-between items-center">
          <div>菜单名称</div>
          <Input placeholder="请输入菜单名称" className="ml-[5px] w-[170px]" />
        </div>
        <div className="ml-[10px]">
          状态
          <Select
            defaultValue="部门状态"
            className="ml-[10px]"
            onChange={handleChange}
            options={[
              {
                value: "正常",
                label: "正常",
              },
              {
                value: "不正常",
                label: "不正常",
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
    </div>
  );
};

export default Menu;
