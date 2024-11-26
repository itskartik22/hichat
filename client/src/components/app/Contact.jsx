import { IoSearchOutline } from "react-icons/io5";
import ContactCard from "../ContactCard";
import Seperator from "../Seperator";
import { useEffect, useState } from "react";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import ContactForm from "../Contacts/ContactForm";
import { fetchContacts } from "../../redux/actions/contactActions";
import { useDispatch, useSelector } from "react-redux";


const Contacts = () => {
  const [search, setSearch] = useState("");
  const [createMenuActive, setCreateMenuActive] = useState(false);
  const dispatch = useDispatch();
  const { contacts } = useSelector((state) => state.contact);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleCloseCreateMenu = () => {
    setCreateMenuActive(false);
  };
  const handleSearch = async () => {
    dispatch(fetchContacts(search));
  };

  return (
    <div className="w-full">
      <div className="flex justify-between text-black font-semibold text-lg p-3 shadow-md">
        <h1>New Chats</h1>
        <button
          className="bg-green-500 text-white px-2 py-1 rounded-md"
          onClick={() => {
            setCreateMenuActive(true);
          }}
        >
          <MdOutlineCreateNewFolder size={20} />
        </button>
      </div>
      <Seperator />
      <div className="flex items-center gap-2 py-2 px-1">
        <div className="w-full h-full flex items-center gap-2 text-sm px-3 py-2 rounded-full border border-gray-300 bg-white focus:outline-1 focus:outline-green-900">
          <IoSearchOutline size={20} />
          <input
            type="text"
            placeholder="Search name or phone or email"
            className="w-full h-full focus:outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyUp={handleSearch}
          />
        </div>
      </div>
      <div className="w-full">
        {contacts &&
          contacts.availables.map((contact) => (
            <ContactCard key={contact._id} contact={contact} />
          ))}
        <div className="p-[0.2px] bg-green-800"></div>
        {contacts &&
          contacts.unavailables &&
          contacts.unavailables.map((contact, id) => (
            <ContactCard key={id} contact={contact} />
          ))}
      </div>
      {createMenuActive && (
        <div className="fixed flex justify-center items-center left-0 right-0 bottom-0 top-0 bg-black/70">
          <button
            className="absolute right-5 top-5 text-white px-2 py-1 rounded-md"
            onClick={() => {
              setCreateMenuActive(false);
            }}
          >
            <IoClose size={30} />
          </button>
          <ContactForm handleCloseMenu={handleCloseCreateMenu} />
        </div>
      )}
    </div>
  );
};

export default Contacts;
