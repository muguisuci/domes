import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazyload } from "@/unitls/lazyload";
const Foo = lazyload("@/views/Foo");
const Index = lazyload("index");
const App = () => (
  <div>
    <BrowserRouter>
      <Routes>
        {/* <Route path="/*" element={<Index />}></Route> */}
        <Route path="/" element={<Navigate to="/index" />}></Route>
        <Route path="/index/*" element={<Index />}></Route>
        <Route path="/foo" element={<Foo />}></Route>
      </Routes>
    </BrowserRouter>
  </div>
);

export default App;
