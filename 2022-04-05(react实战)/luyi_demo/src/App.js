import { BrowserRouter, Routes, Route } from "react-router-dom";
// pages
import Home from './pages/home'
import CommandList from "./pages/home/tabPages/commandList";

export default function App(params) {
    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />}>
                <Route path="" element={<CommandList />} />
                <Route path="follow" element={<div>Follow</div>} />
                <Route path="hot" element={<div>Hot</div>} />
                <Route path="zvideo" element={<div>ZVideo</div>} />
            </Route>
            <Route path="/xen" element={<div>Xen</div>}></Route>
            <Route path="/explore" element={<div>Explore</div>}></Route>
            <Route path="/question" element={<div>Question</div>}></Route>

        </Routes>
    </BrowserRouter>
};
