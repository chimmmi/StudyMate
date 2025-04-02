import { ReactNode, useEffect } from "react";
import Nav from "./Nav";

interface HomeLayoutProps {
  children: ReactNode;
}

// main layout for the website

export default function HomeLayout({ children }: HomeLayoutProps) {
  useEffect(() => {
    // Set background image for the body or any specific element
    document.body.style.backgroundImage = "url('/background.jpg')";
    document.body.style.backgroundSize = "cover"; // To make it cover the entire screen
    document.body.style.backgroundPosition = "center"; // To center the image

    return () => {
      // Resetting when leaving the page
      document.body.style.backgroundImage = "";
    };
  }, []);

  return (
    <div className="h-screen flex items-center justify-center gap-5">
      <div className="w-[9vw] max-w-[130px] h-[40rem] bg-[#534f56] rounded-[5px] box_shadow">
      <Nav/>
      </div>
      <div className="w-[90vw] max-w-[1200px] h-[90vh] bg-[#4E4852] text-center p-4 rounded-[5px]  box_shadow">
        {children}
      </div>
    </div>
  );
}
