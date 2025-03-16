import { ArrowBack, Delete } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "tailwindcss/tailwind.css";
import { differenceInYears, parseISO } from "date-fns";
import {
  useBanUserMutation,
  useDeleteUserMutation,
  useForgotPasswordMutation,
  useGetUserImageQuery,
} from "../services/apiConfig";
import { toast, ToastContainer } from "react-toastify";

const Placeholder = () => (
  <Box className="w-full pt-full bg-gray-300 rounded relative flex items-center justify-center text-gray-500">
    <span className="material-icons">image</span>
  </Box>
);

const UserDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const sessionData = location.state?.session;
  const [activeTab, setActiveTab] = useState("General Info"); // Set default tab to "General Info"

  const calculateAge = (dob) => {
    if (!dob) return "N/A";
    try {
      return differenceInYears(new Date(), parseISO(dob));
    } catch (error) {
      return "N/A";
    }
  };

  const { data, error, isLoading } = useGetUserImageQuery({
    id: sessionData?._id,
  });

  useEffect(() => {
    if (error) {
      toast.error(
        error.data?.message || "An error occurred while fetching user image."
      );
    }
  }, [error]);

  const [deleteUser] = useDeleteUserMutation();
  const [banUser] = useBanUserMutation();
  const [forgotPassword] = useForgotPasswordMutation();

  const handleDeleteUser = async () => {
    try {
      const result = await deleteUser({
        id: sessionData?._id,
      }).unwrap();
      toast.success(result.data?.message || "User deleted successfully.");
      navigate(-1);
    } catch (error) {
      toast.error(
        error.data?.message || "An error occurred while deleting the user."
      );
    }
  };

  const handleBanUser = async () => {
    try {
      const result = await banUser({
        id: sessionData?._id,
        banType: "permanent",
      }).unwrap();
      toast.success(result.data?.message || "User banned successfully.");
    } catch (error) {
      toast.error(
        error.data?.message || "An error occurred while banning the user."
      );
    }
  };

  const handleForgotPassword = async () => {
    try {
      const response = await forgotPassword({
        email: sessionData?.email,
      }).unwrap();
      toast.success(
        response.data?.message || "Password reset email sent successfully."
      );
    } catch (error) {
      toast.error(
        error.data?.message ||
          "An error occurred while sending the password reset email."
      );
    }
  };

  return (
    <div>
      <div className="flex justify-between h-12 mb-4">
        <div className="flex items-center">
          <button className="mr-2" onClick={() => navigate(-1)}>
            <ArrowBack />
          </button>
          <h5 className="text-3xl font-semibold">User Management</h5>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleDeleteUser}
            className="flex items-center text-red-500 hover:text-red-700 py-2 px-4"
          >
            <Delete className="mr-2" />
            Delete User
          </button>
          <button
            className="border-2 border-[#8734A3] hover:bg-gray-200 text-[#8734A3] py-2 px-6 rounded-lg font-semibold"
            onClick={handleForgotPassword}
          >
            Reset Password
          </button>
          <button
            className="bg-[#8734A3] hover:bg-[#742985] text-white py-2 px-6 rounded-lg font-semibold"
            onClick={handleBanUser}
          >
            Ban User
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-300">
        <div className="flex border-b border-gray-300">
          {["General Info", "Images"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex px-6 py-4 text-sm font-medium justify-center ${
                activeTab === tab
                  ? "border-b-2 border-[#8734A3] text-[#8734A3]"
                  : "text-gray-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "General Info" && (
          <div className="flex p-4">
            <div className="w-full">
              <div className="grid grid-cols-2 gap-y-4">
                <Detail
                  label="Username"
                  value={sessionData.username || "N/A"}
                />
                <Detail
                  label="Full Name (Legal)"
                  value={sessionData.full_name || "N/A"}
                />
                <Detail label="Mobile" value={sessionData.phone || "N/A"} />
                <Detail label="Email" value={sessionData.email || "N/A"} />
                <Detail
                  label="Pronouns"
                  value={sessionData.pronouns || "N/A"}
                />
                <Detail label="Gender" value={sessionData.gender || "N/A"} />
                <Detail label="Age" value={calculateAge(sessionData.dob)} />
                <Detail
                  label="Subscription"
                  value={sessionData.subscription || "N/A"}
                />
                <Detail
                  label="Member Since"
                  value={sessionData.created_at || "N/A"}
                />
                <Detail
                  label="Bio"
                  value={sessionData.bio || "No description"}
                  className="col-span-2"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === "Images" && (
          <div className="p-4">
            <Typography variant="h6" className="mt-8 mb-2">
              Profile Picture
            </Typography>
            <div className="grid grid-cols-4 gap-4">
              {data?.data?.profile_avatar ? (
                <img
                  src={data.data.profile_avatar}
                  alt="Profile Avatar"
                  className="w-full h-full object-cover rounded"
                />
              ) : (
                <Placeholder />
              )}
            </div>

            <Typography variant="h6" className="mt-8 mb-2">
              Gallery
            </Typography>
            <div className="grid grid-cols-5 gap-4">
              {data?.data?.images?.length > 0
                ? data.data.images.map((image) => (
                    <img
                      key={image._id}
                      src={image.media_url}
                      alt="User Gallery"
                      className="w-full h-full object-cover rounded"
                    />
                  ))
                : [...Array(10)].map((_, index) => <Placeholder key={index} />)}
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

const Detail = ({ label, value, className = "" }) => (
  <div className={`flex flex-col ${className}`}>
    <p className="text-sm text-[#666666]">{label}</p>
    <p className="text-base">{value}</p>
  </div>
);

export default UserDetails;
