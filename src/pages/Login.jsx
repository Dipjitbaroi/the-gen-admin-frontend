import React from "react";
import logo from "../assets/logo.png"; // Make sure to import your logo image
import CustomCheckbox from "../components/layout/Checkbox/checkbox";

const LoginPage = () => {
    const [isChecked1, setIsChecked1] = React.useState(false);

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
          />
          <input
            className="mb-8 w-full p-4 border rounded-xl bg-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-purple-600"
            type="password"
            placeholder="Enter Password"
          />
          <div className="flex items-center mb-8 w-full">
            {/* <input type="checkbox" id="remember" className="mr-2" />
            <label htmlFor="remember" className="">
              Remember me
            </label> */}
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
          <button className="w-full py-4 bg-[#8734A3] text-white rounded-lg hover:bg-purple-700 font-semibold">
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
