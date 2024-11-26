import { useState } from "react";
import { MdOutlineMailLock } from "react-icons/md";
import toast from "react-hot-toast";
import axios from "axios";
import baseUrl from "../../utils/BaseUrl";


const VerifyEmail = ({ email, onNext }) => {
  const [otp, setOtp] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp === "") {
      toast.error("Please fill the OTP field");
      return;
    }
    axios({
        method: "POST",
        url: `${baseUrl}/api/auth/verify-email`,
        data: {
            email,
            otp,
        },
        })
        .then((res) => {
            if (res.data.status === "success") {
            toast.success(res.data.message);
            onNext({ emailVerified: true });
            } else {
            toast.error(res.data.message);
            }
        })
        .catch((err) => {
            console.log(err);
            toast.error("Something went wrong");
        });
  }
  return (
    <div className="w-[400px] p-4 rounded-md shadow-md">
      <div className="flex flex-col items-center justify-center">
        <MdOutlineMailLock className="text-5xl text-blue-500" />
        <p className="text-base text-center ml-2">Please check your email. We have sent you an OTP on it.</p>
      </div>

      <form className="space-y-4 mt-2" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="otp" className="block">
            One-Time-Password(OTP)
          </label>
          <input
            type="text"
            id="otp"
            name="otp"
            className="w-full border-gray-300 border-[2px] p-1 rounded-md"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white border-[2px] p-2 rounded-md"
          >
            Verify
          </button>
        </div>
      </form>
    </div>
  );
};

export default VerifyEmail;
