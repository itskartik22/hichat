import { useDispatch } from "react-redux";
import Avatar from "./Avatar";
import PropTypes from "prop-types";
import { setSelectedChat } from "../redux/chatSlice";
import { useNavigate } from "react-router-dom";

const ContactCard = ({contact}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const selectChat = () => {
    dispatch(setSelectedChat(contact));
    navigate("/app/chat");
  }
  return (
    <div className="flex items-center gap-2 p-2 border-b-[1px] border-slate-300 cursor-pointer hover:bg-slate-400/10">
      <Avatar url={contact?.profile_pic} alt={contact?.name} userId={contact?._id} size="medium" />
      <div onClick={selectChat}>
        <h1 className="font-semibold">{contact?.name}</h1>
        <p className="w-[200px] text-gray-500 truncate text-sm">
          {contact && contact.email ? contact.email : "invite"}
        </p>
      </div>
    </div>
  );
};

ContactCard.propTypes = {
  contact: PropTypes.object.isRequired,
};

export default ContactCard;
