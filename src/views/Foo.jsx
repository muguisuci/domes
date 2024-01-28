// use开头的函数 hook函数
// useEffect==componentDidMount + componentDidUpdate+componentWillUnmount
// import { useState, useRef } from "react";
// import { root } from "../index";
// import {
//   useComponentDidMount,
//   useBeforeDestory,
//   useUpdate,
// } from "../hooks/index";
// 基于useEffect封装 useComponentDidMount

// function Foo() {
//   const divRef = useRef();
//   let [count, setCount] = useState(0);
//   useComponentDidMount(() => {
//     console.log("componentDidMount");
//   });
//   useBeforeDestory(() => {
//     console.log("useBeforeDestory");
//   });
//   useUpdate(() => {
//     console.log("useUpdate");
//   });
//   // 使用useEffect实现 componentDidMount
//   // useEffect(() => {
//   //   console.log("componentDidMount");
//   // }, []);
//   // 使用 useEffect 实现 componentDidMount + componentDidUpdate
//   // useEffect(() => {
//   //   console.log("componentDidMount + componentDidUpdate");
//   // }, [count]);
//   // 使用useEffect实现 componentWillUnmount
//   // useEffect(() => {
//   //   return () => {
//   //     console.log("componentWillUnmount");
//   //   };
//   // }, []);
//   // 组件第一次执行打印1 组件更新打印1 组件卸载打印2
//   // useEffect(() => {
//   //   console.log(1);
//   //   return () => {
//   //     console.log(2);
//   //   };
//   // });
//   // 组件第一次执行打印1 组件任何数据更新不打印 组件卸载打印2
//   // useEffect(() => {
//   //   console.log(1);
//   //   return () => {
//   //     console.log(2);
//   //   };
//   // }, []);
//   // divRef的值如何获取
//   // useEffect(() => {
//   //   console.log(divRef.current);
//   // }, [divRef]);
//   return (
//     <div>
//       <div ref={divRef} onClick={() => setCount(count + 1)}>
//         {count}
//       </div>
//       <button onClick={() => root.unmount()}>销毁</button>
//     </div>
//   );
// }
// import { useNavigate } from "react-router-dom";
// import { Button } from "antd";
// useNavigate 是react-router-dom 提供的hook
// 此hook可以返回一个跳转页面的方法
// const Foo = () => {
//   const navigate = useNavigate();
//   return (
//     <div>
//       <Button onClick={() => navigate("/index")}>to Index</Button>
//       <Button onClick={() => navigate("/bar/123")}>to Bar</Button>
//     </div>
//   );
// };
// export default Foo;

// react hooks是什么 一组能够模拟类组件功能的函数
// react hooks 是一组函数
// 为什么要有react hooks？
// 为了让函数组件的功能和类组件相当 但是 学习的复杂度+记忆成本直线降低
// 类组件==函数组件 + hooks
/**
 * hook使用条件
 * hook在组件中使用时必须在组件的顶层 不得出现在任何嵌套结构(if条件判断 for循环)中
 *
 * react允许你基于官方的hook函数封装你自己的hook函数(hook可以在任何自定义hook函数中使用)
 *
 */

// const Foo = () => {
//   const navigate = useNavigate();
//   return (
//     <div className="h-[100vh] bg-cyan-400" onClick={() => navigate("/index")}>
//       Foofdssadfa
//     </div>
//   );
// };
import React from "react";
const FooContext = React.createContext();
const FooChild = () => {
  const data = React.useContext(FooContext);
  const [, setFooData] = React.useContext(FooContext);
  console.log("data", data);
  return <div onClick={setFooData({ a: 1, b: 2 })}>Foo的子节点</div>;
};
const Foo = () => {
  const [data, setData] = React.useContext({ a: 2, b: 3 });
  return (
    <div className="h-[100vh]">
      Foo
      <FooContext.Provider value={{ data, setData }}>
        <FooChild />
      </FooContext.Provider>
    </div>
  );
};
// 全局数据传递(共享)
// createContext useContext 类似于vue的provide和inject
export default Foo;
