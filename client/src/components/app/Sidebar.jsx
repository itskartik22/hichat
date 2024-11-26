import { TbHistoryToggle } from "react-icons/tb";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { LuContact } from "react-icons/lu";
import Avatar from "../Avatar.jsx";
import { useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import UserMenu from "./UserMenu.jsx";

const Sidebar = () => {
  const { userInfo } = useSelector((state) => state.user);

  const [userMenu, setUserMenu] = useState(false);
  const menuRef = useRef(null);

  const toggleUserMenu = () => {
    setUserMenu(true);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setUserMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-[340px] flex flex-row h-full rounded-r-md bg-green-900">
      <div className="w-[60px] flex flex-col items-center justify-between">
        <div className="w-full text-white flex flex-col">
          <NavLink
            to="chat"
            className={({ isActive }) => {
              return isActive
                ? "w-full h-12 flex items-center justify-center  bg-white/90 text-green-900"
                : "w-full h-12 flex items-center justify-center  hover:bg-white/90 hover:text-green-900";
            }}
          >
            <IoChatboxEllipsesOutline size={26} />
          </NavLink>
          <NavLink
            to="status"
            className={({ isActive }) => {
              return isActive
                ? "w-full h-12 flex items-center justify-center  bg-white/90 text-green-900"
                : "w-full h-12 flex items-center justify-center  hover:bg-white/90 hover:text-green-900";
            }}
          >
            <TbHistoryToggle size={26} />
          </NavLink>
          <NavLink
            to="contacts"
            className={({ isActive }) => {
              return isActive
                ? "w-full h-12 flex items-center justify-center  bg-white/90 text-green-900"
                : "w-full h-12 flex items-center justify-center  hover:bg-white/90 hover:text-green-900";
            }}
          >
            <LuContact size={26} />
          </NavLink>
        </div>
        {userMenu && (
          <div
            ref={menuRef}
            className="absolute left-0 bottom-0 w-[300px] h-[600px] flex items-center justify-center  bg-white z-10 text-green-900 rounded"
          >
            <UserMenu user={userInfo} />
          </div>
        )}
        <div className="mb-4 relative cursor-pointer" onClick={toggleUserMenu} title={userInfo?.name}>
          {userInfo && (
            <Avatar url={userInfo?.profile_pic} alt={userInfo?.name} userId={userInfo?._id} size={"medium"} />
          )}
        </div>
      </div>
      <div className="w-[280px] bg-white/95">
        <Outlet />
      </div>
    </div>
  );
};

export default Sidebar;
