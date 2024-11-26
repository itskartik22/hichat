import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import baseUrl from "../../utils/BaseUrl";

const RegisterInfo = ({ onNext }) => {
  const [data, setData] = useState({
    name: "",
    email: "",
    number: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      data.name === "" ||
      data.email === "" ||
      data.number === "" ||
      data.password === ""
    ) {
      toast.error("Please fill all the fields");
      return;
    }
    axios({
      method: "POST",
      url: `${baseUrl}/api/auth/register`,
      data: data,
    })
      .then((res) => {
        if (res.data.status === "success") {
          toast.success(res.data.message);
          onNext(data);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong");
      });
  };
  return (
    <div className="w-[400px] p-4 rounded-md shadow-md">
      <h1 className="text-center font-semibold text-xl">Register</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="block">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full border-gray-300 border-[2px] p-1 rounded-md"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="email" className="block">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full border-gray-300 border-[2px] p-1 rounded-md"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="number" className="block">
            Mobile No.
          </label>

          <input
            type="text"
            id="number"
            name="number"
            className="w-full border-gray-300 border-[2px] p-1 rounded-md"
            value={data.number}
            onChange={(e) => setData({ ...data, number: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="password" className="block">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full border-gray-300 border-[2px] p-1 rounded-md"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full bg-Register-700 text-white border-[2px] p-2 rounded-md"
          >
            Create Account
          </button>
        </div>
        <div>
          <p className="text-center">
            Already have an account?{" "}
            <Link to="/auth/login" className="text-blue-500">
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterInfo;
