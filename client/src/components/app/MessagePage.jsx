import { useEffect, useRef, useState } from "react";
import { IoIosChatbubbles } from "react-icons/io";
import Avatar from "../Avatar";
import {
  IoImageOutline,
  IoSearchOutline,
  IoVideocamOutline,
} from "react-icons/io5";
import { useSelector } from "react-redux";
import { ImAttachment } from "react-icons/im";
import { IoSend } from "react-icons/io5";
import { IoDocumentTextOutline } from "react-icons/io5";
import moment from "moment";

const MessagePage = () => {
  const [attachmentMenu, setAttachmentMenu] = useState(false);
  const attachmentMenuRef = useRef(null);
  const currentMessage = useRef(null);
  const { selectedChat } = useSelector((state) => state.chat);
  const { socketConnection, userInfo } = useSelector((state) => state.user);
  // console.log("Selected Chat", selectedChat);

  const [activeParticipant, setActiveParticipant] = useState({
    userId: "",
    name: "",
    profile_pic: "",
    onlineStatus: false,
    email: "",
    mobile: "",
  });
  //Input Message
  const [message, setMessage] = useState({
    text: "",
    senderId: "",
    receiverId: "",
  });
  //Messages
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (socketConnection) {
      socketConnection.emit("message-page", { userId: selectedChat?._id });

      const handleParticipant = (data) => {
        setActiveParticipant({
          ...data,
          userId: data?._id,
        });
      };

      socketConnection.on("message-participant", handleParticipant);

      const handleMessage = (data) => {
        console.log(
          data[data.length - 1].sender,
          selectedChat?._id,
          userInfo?._id
        );
        if (
          data[data.length - 1].sender === selectedChat?._id ||
          data[data.length - 1].sender === userInfo?._id
        ) {
          setMessages(data);
        }
      };

      socketConnection.emit("get-conversation", {
        senderId: userInfo?._id,
        receiverId: selectedChat?._id,
      });

      socketConnection.on("message", handleMessage);
      return () => {
        socketConnection.off("message-participant", handleParticipant);
        socketConnection.off("message", handleMessage);
      };
    }
  }, [socketConnection, selectedChat, userInfo]);
  useEffect(() => {
    const handleMouseDown = (event) => {
      if (
        attachmentMenuRef.current &&
        !attachmentMenuRef.current.contains(event.target)
      ) {
        setAttachmentMenu(false);
      }
    };

    document.addEventListener("mousedown", handleMouseDown);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, [attachmentMenuRef]);

  useEffect(() => {
    if (currentMessage.current) {
      currentMessage.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.text) {
      {
        socketConnection.emit("new-message", {
          senderId: userInfo?._id,
          receiverId: activeParticipant.userId,
          text: message.text,
        });
      }
    }
    setMessage({ text: "" });
  };

  return (
    <div className="w-full h-full flex">
      {activeParticipant && selectedChat ? (
        <div className="h-full w-full flex flex-col">
          <div className="w-full h-[60px] bg-green-900/10 shadow-md p-4 flex justify-between">
            <div className="h-full flex gap-2 items-center">
              <Avatar
                url={activeParticipant?.profile_pic}
                alt={activeParticipant?.name}
                userId={activeParticipant?._id}
                size="medium"
              />
              <div>
                <h1 className="text-black font-semibold text-lg leading-6">
                  {activeParticipant?.name}
                </h1>
                {activeParticipant?.onlineStatus && (
                  <p className="text-black text-sm leading-4">online</p>
                )}
              </div>
            </div>
            <div className="h-full flex items-center gap-2">
              {/* <button className="bg-green-500 text-white p-2 rounded-md">
                    Message
                </button>
                <button className="bg-green-500 text-white p-2 rounded-md">
                    Call
                </button> */}
              <button className="text-black p-2 rounded-md">
                <IoSearchOutline size={22} />
              </button>
            </div>
          </div>
          {/* Message Section */}
          <div className="w-full h-[calc(100vh-170px)] overflow-y-scroll scrollbar scroll-pb-4 p-4 space-y-2">
            {messages &&
              messages.length > 0 &&
              messages.map((message) => {
                return (
                  <div
                    ref={currentMessage}
                    key={message?._id}
                    className={`w-full flex ${
                      message.sender === userInfo?._id
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`p-2 max-w-1/2 shadow-md rounded-md ${
                        message?.sender === userInfo?._id
                          ? "bg-green-300/20 text-black"
                          : "bg-white text-black"
                      }`}
                    >
                      {message.text}
                      <span
                        className={`text-xs block
                        ${
                          message.sender === userInfo?._id
                            ? "text-right"
                            : "text-left"
                        }
                       `}
                      >
                        {moment(message.createdAt).format("hh:mm A")}
                      </span>
                    </div>
                  </div>
                );
              })}
          </div>
          {/* Message Input Section */}
          <div className="w-full">
            <div className="w-full h-[60px] bg-green-900/5 shadow-md p-4 flex items-center gap-2">
              <div
                className="text-black p-3 rounded-md hover:bg-white/50 relative"
                onClick={() => {
                  setAttachmentMenu(!attachmentMenu);
                }}
                title="Attach"
              >
                <ImAttachment size={22} />
              </div>
              {/* // Attachment Menu */}
              {attachmentMenu && (
                <div
                  ref={attachmentMenuRef}
                  className="absolute bg-white bottom-16 p-2 shadow-md rounded-md"
                >
                  <form className="flex flex-col">
                    <div className="p-1 hover:bg-black/10 rounded">
                      <label
                        htmlFor="document"
                        className="cursor-pointer flex items-center gap-1.5"
                      >
                        <IoDocumentTextOutline
                          className="text-red-500"
                          size={20}
                        />
                        Document
                      </label>
                      <input
                        type="file"
                        id="document"
                        className="hidden"
                        accept=".pdf,.doc,.docx"
                      />
                    </div>
                    <div className="p-1 hover:bg-black/10 rounded">
                      <label
                        htmlFor="image"
                        className="cursor-pointer flex items-center gap-1.5"
                      >
                        <IoImageOutline className="text-yellow-500" size={20} />
                        Image
                      </label>
                      <input
                        type="file"
                        id="image"
                        className="hidden"
                        accept=".jpg,.jpeg,.png,.gif"
                      />
                    </div>
                    <div className="p-1 hover:bg-black/10 rounded">
                      <label
                        htmlFor="document"
                        className="cursor-pointer flex items-center gap-1.5"
                      >
                        <IoVideocamOutline
                          className="text-purple-500"
                          size={20}
                        />
                        Video
                      </label>
                      <input
                        type="video"
                        id="document"
                        className="hidden"
                        accept=".mp4,.mkv,.avi"
                      />
                    </div>
                  </form>
                </div>
              )}
              <form
                className="flex w-full items-center"
                onSubmit={handleSendMessage}
              >
                <input
                  type="text"
                  placeholder="Type message here..."
                  className="w-full h-full focus:outline-none bg-transparent text-black"
                  value={message?.text}
                  onChange={(e) => {
                    setMessage({ ...message, text: e.target.value });
                  }}
                />
                <button
                  className="py-2 px-3 rounded-md bg-green-500 text-white hover:bg-green-700"
                  type="submit"
                >
                  <IoSend size={22} />
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center">
          <IoIosChatbubbles size={100} className="text-gray-500" />
          <h1 className="text-4xl font-semibold text-gray-500">HiChat</h1>
          <p className="text-gray-500">Select a chat to start messaging☺️</p>
        </div>
      )}
    </div>
  );
};

export default MessagePage;
