import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/app/Navbar.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getUser } from "../redux/actions/userActions.js";
import Sidebar from "../components/app/Sidebar.jsx";
import MessagePage from "../components/app/MessagePage.jsx";
import { io } from "socket.io-client";
import baseUrl from "../utils/BaseUrl.js";
import { setContactOnlines, setSocketConnection } from "../redux/userSlice.js";

const AppLayout = () => {
  const { token, userInfo } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!token) {
      navigate("/auth/login");
    }
    if (!userInfo) {
      dispatch(getUser());
    }
    return () => {};
  }, [token, userInfo, navigate, dispatch]);

  //***Socket Connection */
  useEffect(() => {
    const socketConnection = io(baseUrl, {
      auth: {
        token: token,
      },
    });

    socketConnection.on("onlineUsers", async (data) => {
      dispatch(setContactOnlines(data));
    });

    dispatch(setSocketConnection(socketConnection));

    return () => {
      socketConnection.disconnect();
    }
  }, [dispatch, token]);

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className=" w-screen h-full flex flex-row text-black">
        <Sidebar />
        <MessagePage />
      </div>
      {/* <footer className="bg-gray-200 text-white text-center p-1">App Footer</footer> */}
    </div>
  );
};

export default AppLayout;
