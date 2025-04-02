import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import api from "@/utils/axiosInstance";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    if(!identifier || !password) {
      alert("Please fill in all fields");
      return;
    }

    const submitData = {
      identifier,
      password,
    }
    
    try {
      const response = await api.post("/auth/login", submitData)
      if (response.status === 200) {
        setLoading(false);
        navigate("/");
      }
    } catch (error: any) {
      console.error(error.reponse.message);
    }
  }

  return (
    <div className="text-[#FFF5E5] pt-[6rem]">
      {/* Logo */}
      <img
        src="/logo.svg"
        alt="logo"
        width={65}
        height={50}
        className="absolute transform top-[8.5%] left-[55.5%]"
      />

      {/* Heading */}
      <h1 className="jetbrains_medium text_shadow text-center relative text-[3rem] font-extrabold">
        StudyMate.com
      </h1>

      {/* Login Form */}
      <form onSubmit={handleLogin} className="flex flex-col gap-10 justify-center items-center pt-[3rem]">
        <Input type="text" placeholder="Email or Username" onChange={(e) => setIdentifier(e.target.value)} />
        <Input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
        <Button
          type="submit"
          className="box_shadow bg-[#6170A9] hover:bg-slate-600 transition-all duration-300 ease-in-out cursor-pointer w-[10rem]"
        >
          Login
        </Button>
      </form>

      {/* Signup Section */}
      <div className="flex flex-col gap-2.5 justify-center items-center pt-5">
        <p className="text-center text-slate-400 pt-1.5">-------------------</p>
        <p className="text-[13px] text-center pt-2 pb-3">
          Don't have an account yet?...
        </p>
        <Link to="/signup">
          <Button className="box_shadow text-black bg-[#E7D7BC] hover:bg-slate-600 transition-all duration-300 ease-in-out cursor-pointer w-[10rem]">
        Sign up
          </Button>
        </Link>
      </div>
    </div>
  );
}
