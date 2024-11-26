import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Error from "../components/Error";
import axios from "axios";
import baseUrl from "../utils/BaseUrl";
import PropTypes from "prop-types";
import Avatar from "../components/Avatar";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/actions/userActions";
import { clearError } from "../redux/userSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchedData, setFetchedData] = useState(null);
  const [error, setError] = useState(null);
  const [section, setSection] = useState(1);
  const handleEmailSubmit = (e) => {
    setLoading(true);
    setError(null);
    e.preventDefault();
    if (!email) {
      setError("Email is required");
    }
    axios({
      method: "POST",
      url: `${baseUrl}/api/user/checkEmail`,
      data: {
        email,
      },
      withCredentials: true,
    })
      .then((response) => {
        console.log(response.data);
        setFetchedData(response.data.data);
        setSection(2);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.response.data);
        setError(error.response.data.message);
        setLoading(false);
      });
  };

  return (
    <div className="w-[400px] p-4 rounded-md shadow-md">
      {section === 1 && (
        <div>
          <div className="flex flex-col gap-2">
            <h1 className="text-center font-semibold text-xl">Login</h1>
            <p>Welcome to HiChat App!</p>
          </div>
          <form className="space-y-4" onSubmit={handleEmailSubmit}>
            <div>
              <label htmlFor="email" className="block">
                Email
              </label>
              <input
                type="text"
                id="email"
                name="email"
                className="w-full border-gray-300 border-[2px] p-1 rounded-md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              {error && <Error>{error}</Error>}
              <button
                type="submit"
                className="w-full bg-green-700 text-white border-[2px] p-2 rounded-md"
                disabled={loading}
              >
                {loading ? "Loading..." : "Next"}
              </button>
            </div>
          </form>
        </div>
      )}
      {section === 2 && <Section2 data={fetchedData} />}
      <div>
        <p className="text-center">
          If you have an account?{" "}
          <Link to="/auth/register" className="text-blue-500">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

const Section2 = ({ data }) => {
  const { success, token, loading, error } = useSelector((state) => state.user);
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (success && token) {
      navigate("/app");
    }
    return () => {
      dispatch(clearError());
    };
  }, [success, token, navigate, dispatch]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!password) {
      return;
    }
    dispatch(clearError());
    dispatch(
      loginUser({
        email: data.email,
        password,
      })
    );
    setPassword("");
  };
  return (
    <div>
      <div className="flex justify-center flex-col items-center gap-1">
        <Avatar url={data.profile_pic} alt={data.name} size={"extraLarge"} />
        <h4 className="font-medium">Hi, {data?.name ? data?.name : "User"}</h4>
      </div>
      <form className="space-y-4" onSubmit={handleLogin}>
        <div>
          <label htmlFor="password" className="block">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full border-gray-300 border-[2px] p-1 rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          {error && <Error>{error}</Error>}
          <button
            type="submit"
            className="w-full bg-green-700 text-white border-[2px] p-2 rounded-md"
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
};

Section2.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    _id: PropTypes.string,
    profile_pic: PropTypes.string,
  }).isRequired,
};

export default Login;
