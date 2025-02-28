import React, { useState } from "react";
import logo from "../assets/logo.png";
import CustomCheckbox from "../components/layout/Checkbox/checkbox";
import { useLoginMutation } from "../services/apiConfig";

const LoginPage = () => {
  const [isChecked1, setIsChecked1] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login, { isLoading }] = useLoginMutation();

  const handleCreatePost = async () => {
    try {
      const res = await login({ email, password });
      if (res?.data?.accessToken) {
        localStorage.setItem('token', res.data.accessToken);
        console.log('Login successful:', res);
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };
  
  const handleCheckboxChange1 = (event) => {
    setIsChecked1(event.target.checked);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-white">
      <div className="flex items-center justify-center w-full py-20 bg-gradient-to-r from-[#EDAAA5] to-[#CEA5ED]">
        <div>
          <img src={logo} alt="Logo" className="w-auto h-26" />
        </div>
      </div>
      <div className="flex w-full h-100 justify-center">
        <div className="flex flex-col items-center bg-white mt-8 p-8 w-1/3 h-auto">
          <div className="justify-normal w-full">
            <h1 className="text-3xl font-bold mb-2">Login</h1>
          </div>
          <p className="text-[#666666] mb-8 w-full">
            To sign up please enter your email address
          </p>
          <input
            className="mb-4 w-full p-4 border rounded-xl bg-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-purple-600"
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="mb-8 w-full p-4 border rounded-xl bg-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-purple-600"
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex items-center mb-8 w-full">
            <CustomCheckbox
              label="Remember me"
              checked={isChecked1}
              onChange={handleCheckboxChange1}
            />
          </div>
          <a
            href="#"
            className="mb-6 text-[#8734A3] w-full text-end font-semibold"
          >
            Forgot Password?
          </a>
          <button
            className="w-full py-4 bg-[#8734A3] text-white rounded-lg hover:bg-purple-700 font-semibold"
            onClick={handleCreatePost}
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
