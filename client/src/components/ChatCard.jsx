import { useDispatch } from "react-redux";
import Avatar from "./Avatar";
import PropTypes from "prop-types";
import { setSelectedChat } from "../redux/chatSlice";

const ChatCard = ({
  participantDetails,
  latestMessage,
  unseenMessages,
  userId,
  selectedChat,
}) => {
  
  const dispatch = useDispatch();
  // const user = {
  //   name: "John Doe",
  //   bio: "Hey there! I am using HiChat",
  //   profile_pic: null,
  // };
  console.log(participantDetails, unseenMessages);
  return (
    <div className={`relative flex items-center gap-2 p-2 border-b-[1px] border-slate-300 cursor-pointer hover:bg-slate-400/10 ${participantDetails?._id ===  selectedChat?._id && "bg-slate-400/10" }`} onClick={() => {
      dispatch(setSelectedChat(participantDetails));
      // dispatch(setChatOpen(true));
    }}>
      <Avatar
        url={participantDetails.profilePicture}
        alt={participantDetails.name}
        size="medium"
      />
      <div>
        <h1 className="font-semibold">{participantDetails.name}</h1>
        {latestMessage && (
          <p className="w-[200px] text-gray-500 truncate text-[12px]">
            {latestMessage.sender === userId ? "You: " : ""}
            {latestMessage?.text}
          </p>
        )}
      </div>
      {unseenMessages > 0 && (
        <div className=" absolute right-5 w-6 h-6 flex items-center justify-center bg-green-500 text-white rounded-full text-sm">
          {unseenMessages}
        </div>
      )}
    </div>
  );
};

ChatCard.propTypes = {
  participantDetails: PropTypes.object.isRequired,
  latestMessage: PropTypes.object.isRequired,
  unseenMessages: PropTypes.number.isRequired,
  userId: PropTypes.string.isRequired,
  selectedChat: PropTypes.object.isRequired,
};

export default ChatCard;
