// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { lazyload } from "@/unitls/lazyload";
import Routes from "./router/index";
// const Layout = lazyload("Layout");
// const Login = lazyload("Login");
// const Test = lazyload("textes");
// const Foo = lazyload("Foo");
const App = () => (
  <div>
    <Routes />
    {/* <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Index />}></Route>
        <Route path="/" element={<Navigate to="/login" />}></Route>
        <Route path="/layout/*" element={<Layout />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/test" element={<Test />}></Route>
        <Route path="/foo" element={<Foo />}></Route>
      </Routes>
    </BrowserRouter> */}
  </div>
);

export default App;
