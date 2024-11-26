import Seperator from "../Seperator";
import ChatList from "./ChatList";

const Chat = () => {
  return (
    <div className="w-full h-full">
      <h1 className="text-black font-semibold text-lg p-3 shadow-md">
        Messages
      </h1>
      <Seperator />
      <ChatList />
    </div>
  );
};

export default Chat;
