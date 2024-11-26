import { useState } from "react";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import axios from "axios";
import baseUrl from "../../utils/BaseUrl";

const ContactForm = ({ handleCloseMenu }) => {
  const [newContact, setNewContact] = useState({
    name: "",
    mobile: "",
  });
  const handleCreateContact = (e) => {
    e.preventDefault();
    if (newContact.name === "" || newContact.mobile === "") {
      toast.error("Please fill all the fields");
      return;
    }
    axios({
        method: "POST",
        url: `${baseUrl}/api/user/add-contact`,
        data: newContact,
        withCredentials: true,
    }).then((res) => {
        if (res.data.status === "success") {
            toast.success(res.data.message);
            handleCloseMenu();
        } else {
            toast.error(res.data.message);
        }
    }).catch((err) => {
        console.log(err);
        toast.error("Something went wrong");
    });
  };

  return (
    <div className="w-[300px] bg-white rounded-md shadow-md p-4">
      <h1 className="text-center font-semibold text-xl">Create Contact</h1>
      <form className="space-y-2 p-4" onSubmit={handleCreateContact}>
        <div>
          <label htmlFor="name" className="block">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full border-gray-300 border-[2px] p-1 rounded-md"
            value={newContact.name}
            onChange={(e) => {
              setNewContact({ ...newContact, name: e.target.value });
            }}
          />
        </div>
        <div>
          <label htmlFor="number" className="block">
            Mobile no.
          </label>
          <input
            type="text"
            id="number"
            name="number"
            className="w-full border-gray-300 border-[2px] p-1 rounded-md"
            value={newContact.number}
            onChange={(e) => {
              setNewContact({ ...newContact, mobile: e.target.value });
            }}
          />
        </div>
        <div className="flex gap-2">
          <button
            className="w-full bg-red-500 text-white p-1 rounded-md"
            onClick={() => {
              handleCloseMenu();
            }}
          >
            Cancel
          </button>
          <button
            className="w-full bg-green-500 text-white p-1 rounded-md"
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

ContactForm.propTypes = {
  handleCloseMenu: PropTypes.func,
};

export default ContactForm;
