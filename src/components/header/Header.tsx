import { NavLink } from "react-router-dom";
import bgHeader from "../../assets/bgheader.png";
import icon from "../../assets/icon.png";
import { MdOutlineNotifications } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";
const Header = () => {
  return (
    <div
      className="bg-cover bg-center text-white h-[120px] containerM flex items-center px-5 justify-between sticky top-0 "
      style={{
        backgroundImage: `url(${bgHeader})`,
      }}
    >
      <div className="flex gap-1 items-center">
        <img src={icon} alt="icon" className="w-[100px] h-[90px]" />
        <h1 className="w-[180px] font-serif font-bold text-3xl text-[#CC9600]">
          NETH BOOKPOINT{" "}
        </h1>
      </div>
      <ul className="flex items-center gap-5 text-[20px]">
        <li>
          <NavLink to={"/"}>Home</NavLink>
        </li>
        <li>
          <NavLink to={"/about"}>About</NavLink>
        </li>
        <li>
          <NavLink to={"/shop"}>Shop</NavLink>
        </li>
        <li>
          <NavLink to={"/manage"}>Manage</NavLink>
        </li>
        <li className="text-[30px]">
          <MdOutlineNotifications />
        </li>
        <li className="flex flex-col justify-center items-center text-[25 px]">
          <RxAvatar />
          <p className="text-xs">Sign in</p>
        </li>
      </ul>
    </div>
  );
};

export default Header;
