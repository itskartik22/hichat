import { IoIosChatbubbles } from "react-icons/io";
const Navbar = () => {
  return (
    <div className="flex px-4 py-2 justify-between bg-green-900 text-white">
      <div className="flex items-center text-2xl font-semibold gap-1">
        <IoIosChatbubbles />
        <h1>HiChat</h1>
      </div>
    </div>
  );
};

export default Navbar;
