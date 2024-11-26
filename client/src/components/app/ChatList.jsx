import { IoSearchOutline } from "react-icons/io5";
import ChatCard from "../ChatCard";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ChatList = () => {
  const [recentChats, setRecentChats] = useState([]);
  const { socketConnection, userInfo } = useSelector((state) => state.user);
  const { selectedChat } = useSelector((state) => state.chat);
  useEffect(() => {
    if(socketConnection && userInfo) {
      socketConnection.emit("recent-chats", {userId: userInfo?._id});
      socketConnection.on("recent-chats", (data) => {

        const recentChats = data.map((chat, index) => {
          if(chat.senderDetails[0]._id === chat.receiverDetails[0]._id){
            return {
              ...chat,
              participantDetails: chat.senderDetails[0],
              index: index
            }
          }
          else if(chat.senderDetails[0]._id === userInfo._id){
            return {
              ...chat,
              senderDetails: undefined,
              receiverDetails: undefined,
              participantDetails: chat.receiverDetails[0],
              index: index
            }
          }
          else{
            return {
              ...chat,
              senderDetails: undefined,
              receiverDetails: undefined,
              participantDetails: chat.senderDetails[0],
              index: index
            }
          }
        });
        setRecentChats(recentChats);
      });
    }
  }, [socketConnection, userInfo, setRecentChats]);

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 py-2 px-1">
        <div className="w-full h-full flex items-center gap-2 text-sm px-3 py-2 rounded-full border border-gray-300 bg-white focus:outline-1 focus:outline-green-900">
          <IoSearchOutline size={20} />
          <input
            type="text"
            placeholder="Search Chat"
            className="w-full h-full focus:outline-none"
          />
        </div>
      </div>
      <div className="relative w-full h-[calc(100vh-168px)] overflow-y-auto scrollbar">
        {recentChats.length > 0 ? (
          recentChats.map((chat) => (
            <ChatCard
              key={chat._id}
              participantDetails={chat.participantDetails}
              latestMessage={chat.latestMessage}
              unseenMessages={chat.unseenMessageCount}
              userId={userInfo._id}
              selectedChat={selectedChat}
            />
          ))
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-gray-400">No Recent Chats</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatList;
