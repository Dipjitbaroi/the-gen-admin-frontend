import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import logo from "../assets/logo.png";
import CustomCheckbox from "../components/layout/Checkbox/checkbox";
import { useLoginMutation } from "../services/apiConfig";
import { useAuth } from "../config/authContext";
import { toast, ToastContainer } from "react-toastify";

const LoginPage = () => {
  const [isChecked1, setIsChecked1] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { login: authLogin } = useAuth();
  const [login, { isLoading }] = useLoginMutation();

  // Load saved email if "Remember Me" was checked
  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setIsChecked1(true);
    }
  }, []);

  const handleLogin = async () => {
    try {
      const res = await login({ email, password });
      if (res?.data?.accessToken) {
        // Store token based on "Remember Me"
        if (isChecked1) {
          localStorage.setItem("token", res.data.accessToken);
          localStorage.setItem("rememberedEmail", email);
        } else {
          sessionStorage.setItem("token", res.data.accessToken);
          localStorage.removeItem("rememberedEmail");
        }
        authLogin(res.data.accessToken);
        navigate("/dashboard");
      } else {
        setError("Invalid email or password");
        toast.error("Invalid email or password");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError("Something went wrong! Please try again.");
      toast.error("Something went wrong! Please try again.");
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
        <div className="flex flex-col items-center bg-white mt-8 p-8 w-1/3 h-auto">
          <h1 className="text-3xl w-full font-bold mb-2">Login</h1>
          <p className="text-[#666666] mb-8 w-full">
            To sign in, enter your email address
          </p>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <input
            className="mb-4 w-full p-4 border rounded-xl bg-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#8734A3]"
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="relative mb-4 w-full">
            <input
              className="w-full p-4 border rounded-xl bg-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#8734A3]"
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              className="absolute inset-y-0 right-0 flex items-center pr-4 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </div>
          </div>

          <div className="flex items-center w-full mb-6">
            <CustomCheckbox
              label="Remember me"
              checked={isChecked1}
              onChange={(e) => setIsChecked1(e.target.checked)}
            />
          </div>

          <a
            href="/forgot-password"
            className="mb-6 text-[#8734A3] hover:text-[#742985] w-full text-end font-semibold"
          >
            Forgot Password?
          </a>

          <button
            className="w-full py-4 bg-[#8734A3] text-white rounded-lg hover:bg-[#742985] font-semibold"
            onClick={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginPage;
