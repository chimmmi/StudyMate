import { Link } from "react-router";
import { CiGlobe } from "react-icons/ci";

const Nav = () => {
  return (
    <nav className="text-white flex flex-col justify-center items-center pt-[10rem]">
      <ul className="flex gap-4 p-4 justify-center hover:bg-[#6170A9] hover:rounded-lg hover:shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105">
        <li><img src="/home-icon.svg" alt="home-icon"/></li>
        <li className="pt-1"><Link to={"/"}>Home</Link></li>
      </ul>
      <ul className="flex gap-4 p-4 justify-center  hover:bg-[#6170A9] hover:rounded-lg hover:shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105">
        <li><img src="/user-icon.svg" alt="home-icon" className="size-[2.1rem]"/></li>
        <li className="pt-1"><Link to={"/profile"}>Profile</Link></li>
      </ul>
      <ul className="flex gap-3 p-4 justify-center  hover:bg-[#6170A9] hover:rounded-lg hover:shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105">
        <li><CiGlobe className="size-[2rem]"/></li>
        <li className="pt-1"><Link to={"/explore"}>Explore</Link></li>
      </ul>

    </nav>
  );
};

export default Nav;
