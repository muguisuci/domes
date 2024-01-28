// 定义高阶组件 withRouter 为了给类组件传递路由参数
// 函数 类
import { useParams, useSearchParams } from "react-router-dom";
// function WithRouter(props) {
//   const params = useParams();
//   console.log(params);
//   return props.children;
// }
function withRouter(Component) {
  return function () {
    const params = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const query = [...searchParams.entries()].reduce((prev, [key, value]) => {
      prev[key] = value;
      return prev;
    }, {});
    return (
      <Component
        {...params}
        {...query}
        setSearchParams={setSearchParams}
      ></Component>
    );
  };
}
// export default WithRouter;
// import { useParams } from "react-router-dom";
// function withRouter(Component) {
//   return function () {
//     const params = useParams();
//     return <Component params={params} />;
//   };
// }
export default withRouter;
