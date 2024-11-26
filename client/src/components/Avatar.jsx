import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const Avatar = ({ url, alt, size = "small", userId }) => {
  const { contactOnlines } = useSelector((state) => state.user);

  let name = "";

  if (alt) {
    const parts = alt.split(" ");
    name = parts.length > 1 ? parts[0][0] + parts[1][0] : parts[0][0];
  }

  const avatarSize = {
    small: "w-10 h-10",
    medium: "w-12 h-12",
    large: "w-16 h-16",
    extraLarge: "w-20 h-20",
  }[size];
  const onlineStatus = contactOnlines.includes(userId);
  return (
    <div className="relative">
      {url ? (
        <>
          <img src={url} alt={alt} className={`${avatarSize} rounded-full`} />
          {onlineStatus && (
            <div className="absolute w-3 h-3 bg-green-500 rounded-full bottom-0 right-0"></div>
          )}
        </>
      ) : (
        <>
          <div
            className={`${avatarSize} rounded-full bg-yellow-100 flex items-center justify-center`}
          >
            <p className="text-gray-500 text-lg font-semibold">{name}</p>
          </div>
          {onlineStatus && (
            <div className="absolute w-3 h-3 bg-green-500 rounded-full bottom-0 right-0"></div>
          )}
        </>
      )}
    </div>
  );
};

Avatar.propTypes = {
  url: PropTypes.string,
  alt: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  userId: PropTypes.string,
};

export default Avatar;
