import { useEffect } from "react";
// import Logo from "../components/Logo"

export default function Home() {
  useEffect(() => {
    // background for the home page:
    document.body.style.background = "#3C363D";
    return () => {
      // reseting when leaving the page:
      document.body.style.backgroundColor = "";
    }
  })
  return (
    <div className="h-screen flex items-center justify-center gap-6">
      <div className="w-[10rem] h-[40rem] bg-[#4B454F] rounded-[5px]"></div>
      <div className="w-[70rem] h-[45rem] bg-[#4E4852] text-center p-4 rounded-[5px]">
        tesssdf
      </div>
    </div>
  );
}


