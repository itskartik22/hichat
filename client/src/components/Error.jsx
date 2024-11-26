import PropTypes from "prop-types";
import { MdErrorOutline } from "react-icons/md";

const Error = ({ children }) => {
  return (
    <div className="bg-red-300 p-2 rounded flex items-center gap-1 text-red-900">
      <MdErrorOutline />
      {children}
    </div>
  );
};
Error.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Error;
