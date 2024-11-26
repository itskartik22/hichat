import { Outlet } from "react-router-dom";
import { IoIosChatbubbles } from "react-icons/io";


const AuthLayout = () => {

  return (
    <div className="w-full h-screen flex flex-col justify-between">
      <div className="flex px-4 py-3 justify-between bg-green-900 text-white">
      <div className="flex items-center text-2xl font-semibold gap-1">
        <IoIosChatbubbles />
        <h1>HiChat</h1>
      </div>
    </div>
      <div className="w-full flex items-center justify-center">
        <Outlet />
      </div>
        <footer className="bg-green-900 text-white text-center p-2">
            &copy; 2024 HiChat
        </footer>
    </div>
  );
};

export default AuthLayout;
