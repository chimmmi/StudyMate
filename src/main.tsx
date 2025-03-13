import "./index.css"
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";

import AuthLayout from "./components/AuthLayout";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Root element not found");
}

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      {/* If signed in */}
      <Route index element={<Home />} />
      <Route element={<AuthLayout />}>
        <Route path="login" element={<Login/>} />
        <Route path="signup" element={<Signup />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
