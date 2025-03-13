import { useState } from "react";
import { NavLink } from "react-router-dom";
import { MdOutlineNotifications } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";
import { HiOutlineMenu, HiX } from "react-icons/hi";
import bgHeader from "../../assets/bgheader.png";
import icon from "../../assets/icon.png";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="bg-cover bg-center text-white h-[80px] md:h-[120px] sticky top-0 z-50 shadow-md"
      style={{ backgroundImage: `url(${bgHeader})` }}
    >
      <div className="container mx-auto flex items-center justify-between px-5 max-w-7xl">
        {/* Logo va nom */}
        <div className="flex items-center gap-3">
          <img
            src={icon}
            alt="icon"
            className="w-[60px] md:w-[100px] h-[60px] md:h-[90px]"
          />
          <h1 className="text-lg md:text-3xl font-serif font-bold text-[#CC9600]">
            NETH BOOKPOINT
          </h1>
        </div>

        {/* Mobil menyu tugmasi */}
        <button
          className="text-3xl md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <HiX /> : <HiOutlineMenu />}
        </button>

        {/* Navigatsiya menyusi */}
        <ul
          className={`md:flex items-center gap-5 text-lg absolute md:static top-[80px] right-0 bg-gray-900 md:bg-transparent w-full md:w-auto p-5 md:p-0 transition-all duration-300 ease-in-out ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <li>
            <NavLink
              to="/"
              className="hover:text-yellow-500 block py-2 md:py-0"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className="hover:text-yellow-500 block py-2 md:py-0"
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/shop"
              className="hover:text-yellow-500 block py-2 md:py-0"
            >
              Shop
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/manage"
              className="hover:text-yellow-500 block py-2 md:py-0"
            >
              Manage
            </NavLink>
          </li>
          <li className="text-2xl md:text-[30px]">
            <MdOutlineNotifications />
          </li>
          <li className="flex flex-col justify-center items-center text-xl">
            <RxAvatar />
            <p className="text-xs">Sign in</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
