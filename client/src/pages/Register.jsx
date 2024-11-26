// import RegisterInfo from "../components/register/RegisterInfo";
// import VerifyEmail from "../components/register/VerifyEmail";
// import ConfigProfile from "../components/register/ConfigProfile";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/actions/userActions";
import Error from "../components/Error";
import { clearError } from "../redux/userSlice";

// const Register = () => {
//   const [step, setStep] = useState(1);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     emailVerified: false,
//     number: "",
//     password: "",
//   });

//   const nextStep = () => {
//     setStep((prev) => prev + 1);
//   };

//   const handleNextStep = (data) => {
//     setFormData((prev) => ({
//       ...prev,
//       ...data,
//     }));
//     nextStep();
//   };

//   return (
//     <div>
//       {step === 1 && <RegisterInfo onNext={handleNextStep} />}
//       {step === 2 && (
//         <VerifyEmail
//           onNext={handleNextStep}
//           email={formData?.email}
//         />
//       )}
//       {step === 3 && <ConfigProfile email={formData?.email} />}
//     </div>
//   );
// };

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    emailVerified: false,
    number: "",
    password: "",
  });

  const { loading, token, error, success } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (success || token) {
      navigate("/app");
    }
    return () => {
      dispatch(clearError());
    };
  }, [navigate, success, token, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.name === "" ||
      formData.email === "" ||
      formData.number === "" ||
      formData.password === ""
    ) {
      toast.error("Please fill all the fields");
      return;
    }
    formData.email = formData.email.toLowerCase();
    dispatch(clearError());
    dispatch(registerUser(formData));
    setFormData({
      name: "",
      email: "",
      emailVerified: false,
      number: "",
      password: "",
    })
    return;
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (
  //     formData.name === "" ||
  //     formData.email === "" ||
  //     formData.number === "" ||
  //     formData.password === ""
  //   ) {
  //     toast.error("Please fill all the fields");
  //     return;
  //   }
  //   axios({
  //     method: "POST",
  //     url: `${baseUrl}/api/user/create`,
  //     data: formData,
  //     withCredentials: true,
  //   })
  //     .then((res) => {
  //       if (res.data.status === "success") {
  //         toast.success(res.data.message);
  //         console.log(res.data);
  //         dispatch(setUser(res.data.data));
  //         dispatch(setToken(res.data.token));
  //         setFormData({
  //           name: "",
  //           email: "",
  //           emailVerified: false,
  //           number: "",
  //           password: "",
  //         });
  //         localStorage.setItem("token", res.data.token);
  //         localStorage.setItem("user", JSON.stringify(res.data.data));
  //         // navigate("/app");
  //       } else {
  //         console.log(res.data);
  //         toast.error("Bohot kuch grbr hai");
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       toast.error(err.response?.data?.message);
  //       toast.error("Kuch to garbar hai.");
  //     });
  // };

  return (
    <div className="w-[400px] p-4 rounded-md shadow-md">
      <h1 className="text-center font-semibold text-xl">Register</h1>
      <form className="space-y-2" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="block">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full border-gray-300 border-[2px] p-1 rounded-md"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
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
            value={formData.number}
            onChange={(e) =>
              setFormData({ ...formData, number: e.target.value })
            }
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
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col gap-1">
          {error && <Error>{error}</Error>}
          <button
            type="submit"
            className="w-full bg-green-700 text-white p-2 rounded-md"
            disabled={loading}
          >
            {loading ? "Loading..." : "Register"}
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

export default Register;
