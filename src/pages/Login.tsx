import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router";

export default function Login() {
  return (
    <div className="text-[#FFF5E5] pt-[6rem]">
      {/* Logo */}
      <img
        src="public/logo.svg"
        alt="logo"
        width={65}
        height={50}
        className="absolute transform top-[7.8%] left-[66%] lg:left-[55.5%] lg:top-[7.8%]"
      />

      {/* Heading */}
      <h1 className="text_shadow text-center relative text-[3rem] font-extrabold">
        StudyMate.com
      </h1>

      {/* Login Form */}
      <form className="flex flex-col gap-10 justify-center items-center pt-[3rem]">
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />
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
