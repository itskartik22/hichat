import Avatar from "../Avatar";
import PropTypes from "prop-types";
import { FiEdit3 } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/userSlice";
import { useState } from "react";
import axios from "axios";
import baseUrl from "../../utils/BaseUrl";
import { getUser } from "../../redux/actions/userActions";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { setSelectedChat } from "../../redux/chatSlice";

const UserMenu = ({ user }) => {
  const [visibleNameField, setVisibleNameField] = useState(false);
  // const [visibleEmailField, setVisibleEmailField] = useState(false);
  const [visibleMobileField, setVisibleMobileField] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name,
    email: user?.email,
    mobile: user?.mobile,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChanges = async () => {
    await axios({
      method: "PUT",
      url: `${baseUrl}/api/user/update-details`,
      data: formData,
      withCredentials: true,
    })
      .then(() => {
        toast.success("Profile updated successfully");
        dispatch(getUser());
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        console.log(error.response.data);
      });
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth/login");
    dispatch(setSelectedChat(null));
  };

  return (
    <div className="w-full flex flex-col h-full p-3 bg-green-900/10 rounded-md shadow-md">
      <div className="flex flex-col gap-2 p-2 rounded-md h-full border-2 bg-white/80">
        <div className="">
          {user && (
            <Avatar src={user.avatar} alt={user.name} size={"extraLarge"} />
          )}
        </div>

        <div className="flex items-center justify-between">
          {visibleNameField ? (
            <input
              className="w-full border-2 border-gray-800 rounded-md p-1 text-black"
              type="text"
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleChanges();
                  setVisibleNameField(false);
                }
              }}
            />
          ) : (
            <h1 className="text-gray-800 font-semibold text-lg">
              {user?.name}
            </h1>
          )}

          {!visibleNameField && (
            <button
              className="p-1 text-gray-800 hover:bg-slate-200 rounded-sm"
              onClick={() => {
                setVisibleNameField(true);
              }}
            >
              <FiEdit3 size={18} />
            </button>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm">Email</span>
            <h1 className="text-gray-900 font-medium">{user?.email}</h1>
          </div>
        </div>
        <div>
          <span className="text-sm">Phone no.</span>
          <div className="flex items-center justify-between">
            {visibleMobileField ? (
              <input
                className="w-full border-2 border-gray-800 rounded-md p-1 text-black"
                type="text"
                value={formData.mobile}
                onChange={(e) => {
                  setFormData({ ...formData, mobile: e.target.value });
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleChanges();
                    setVisibleMobileField(false);
                  }
                }}
              />
            ) : (
              <h1 className="text-gray-900 font-medium">{user?.mobile}</h1>
            )}

            {!visibleMobileField && (
              <button
                className="p-1 text-gray-800 hover:bg-slate-200 rounded-sm"
                onClick={() => {
                  setVisibleMobileField(true);
                }}
              >
                <FiEdit3 size={18} />
              </button>
            )}
          </div>
        </div>
        <div className="p-[0.8px] bg-gray-300"></div>
        <button
          className="h-10 w-[160px] mt-2 py-1 bg-green-800 text-white rounded-md"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

UserMenu.propTypes = {
  user: PropTypes.object.isRequired,
  //   onLogout: PropTypes.func.isRequired,
};

export default UserMenu;
