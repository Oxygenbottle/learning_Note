import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./pages/home/index"
import CommandList from "./pages/home/tabPages/commandList"

export default function App(params) {
  return <BrowserRouter>
  <Routes>
    <Route path="/" element={<Home></Home>}>
      <Route path="Default" element={CommandList}></Route>
      <Route path="Follow" element={<div>Follow</div>}></Route>
      <Route path="Hot" element={<div>Hot</div>}></Route>
      <Route path="ZVideo" element={<div>ZVideo</div>}></Route>
      <Route path=""></Route>
    </Route>
    <Route path="/xen" element={<div></div>}></Route>
  </Routes>
  </BrowserRouter>
}