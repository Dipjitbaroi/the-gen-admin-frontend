import React, { useState } from "react";
import logo from "../assets/logo.png";
import { useForgotPasswordMutation } from "../services/apiConfig";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgetPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [forgetPassword, { isLoading }] = useForgotPasswordMutation();

  const handleForgetPass = async () => {
    try {
      const res = await forgetPassword({ email }).unwrap();
      toast.success(res.data.message || "Password reset link sent to your email");
    } catch (error) {
      const errorMessage = error.data?.message || "Something went wrong! Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-white">
      <div
        className="flex items-center justify-center w-full py-20 bg-gradient-to-r from-[#EDAAA5] to-[#CEA5ED]"
        style={{ backdropFilter: "blur(140px)" }}
      >
        <img src={logo} alt="Logo" className="w-auto h-26" />
      </div>

      <div className="flex w-full h-100 justify-center">
        <div className="flex flex-col items-center bg-white mt-8 p-8 w-1/3 h-auto ">
          <h1 className="text-3xl w-full font-bold mb-2">Forget Password</h1>
          <p className="text-[#666666] mb-8 w-full">
            To reset password, enter your email address
          </p>

          <input
            className="mb-4 w-full p-4 border rounded-xl bg-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#8734A3]"
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            className="w-full py-4 mt-10 bg-[#8734A3] text-white rounded-lg hover:bg-[#742985] font-semibold"
            onClick={handleForgetPass}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Next"}
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ForgetPasswordPage;
