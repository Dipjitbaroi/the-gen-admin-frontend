import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import logo from "../assets/logo.png";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  useGetValidTokenQuery,
  useSetAdminPasswordMutation,
} from "../services/apiConfig";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreatePasswordPage = () => {
  const [searchParams] = useSearchParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const token = searchParams.get("token");

  const { isLoading, isError } = useGetValidTokenQuery(
    { id: token },
    { skip: !token }
  );

  useEffect(() => {
    if (!token) {
      navigate("/forgot-password");
      return;
    }
    if (isLoading) {
      return;
    }
    if (isError) {
      navigate("/forgot-password");
    }
  }, [isError, isLoading, token]);

  const [createPassword, { isLoading: loadingForgetApi }] =
    useSetAdminPasswordMutation();

  const handleCreatePassword = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const res = await createPassword({ token, password }).unwrap();
      toast.success(res.data.message || "Successfully created password.");
      navigate("/login");
    } catch (error) {
      const errorMessage =
        error.data?.message || "Something went wrong! Please try again.";
      toast.error(errorMessage);
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-white">
      <div className="flex items-center justify-center w-full py-20 bg-gradient-to-r from-[#EDAAA5] to-[#CEA5ED] backdrop-blur-[140px] bg-white/30">
        <img src={logo} alt="Logo" className="w-auto h-26" />
      </div>

      <div className="flex w-full justify-center">
        <div className="flex flex-col items-center bg-white mt-8 p-8 w-1/3 h-auto">
          <h1 className="text-3xl w-full font-bold mb-2">Create Password</h1>
          <p className="text-[#666666] mb-8 w-full">Enter your new password.</p>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <div className="relative mb-4 w-full">
            <input
              className="w-full p-4 border rounded-xl bg-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#8734A3]"
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              value={password}
              onChange={handlePasswordChange}
            />
            <div
              className="absolute inset-y-0 right-0 flex items-center pr-4 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </div>
          </div>

          <div className="relative mb-8 w-full">
            <input
              className="w-full p-4 border rounded-xl bg-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#8734A3]"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
            <div
              className="absolute inset-y-0 right-0 flex items-center pr-4 cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
            </div>
          </div>

          <button
            className="w-full py-4 bg-[#8734A3] text-white rounded-lg hover:bg-[#742985] font-semibold"
            onClick={handleCreatePassword}
            disabled={loadingForgetApi}
          >
            {loadingForgetApi ? "Creating..." : "Create Password"}
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CreatePasswordPage;
