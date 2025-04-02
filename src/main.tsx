import "./index.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";

import AuthLayout from "./components/AuthLayout";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Explore from "./pages/Explore";
import Cookies from "js-cookie";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Root element not found");
}
const cookieValue = Cookies.get("jwt");
console.log(cookieValue);

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      {/* If signed in
      <Route
        index
        element={cookieValue ? <Home /> : <Navigate to="/login"/>}
      /> */}
      <Route index element={<Home/>} />
      <Route element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Route>
      <Route path="profile" element={<Profile />} />
      <Route path="explore" element={<Explore/>} />
    </Routes>
  </BrowserRouter>
);
