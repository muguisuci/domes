import { systemUserList } from "@/service";
import {
  // useState,
  useEffect,
} from "react";
const User = () => {
  const gettrees = async () => {
    const list = await systemUserList();
    const listres = list.data.data;
    console.log(listres);
  };
  useEffect(() => {
    gettrees();
  }, []);
  return (
    <>
      <h1>用户管理</h1>
      {/* ... */}
    </>
  );
};

export default User;
