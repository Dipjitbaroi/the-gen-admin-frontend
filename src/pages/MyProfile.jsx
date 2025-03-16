import { ArrowBack } from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useGetPermissionQuery,
  useGetProfileQuery,
} from "../services/apiConfig.js";
import AvatarModal from "../components/layout/Avatar/AvatarModel.jsx";

const MyProfile = () => {
  const { data: resData } = useGetProfileQuery();
  const { data: permissionData } = useGetPermissionQuery();
  const navigate = useNavigate();

  const user = resData?.data;
  const permissions = permissionData ? permissionData : {};

  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getPermissionNames = (permissionCodes) => {
    const permissionNames = [];
    Object.keys(permissions).forEach((category) => {
      Object.entries(permissions[category]).forEach(([action, code]) => {
        if (permissionCodes.includes(code)) {
          permissionNames.push({
            category,
            action,
          });
        }
      });
    });
    return permissionNames;
  };
  const getFirstLetter = (name) => {
    if (!name) return "U";
    return name.charAt(0).toUpperCase();
  };
  return (
    <div className="">
      <div className="flex items-center mb-6">
        <button className="mr-2" onClick={() => navigate(-1)}>
          <ArrowBack />
        </button>
        <h1 className="text-3xl font-bold ml-2">My Profile</h1>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex items-center mb-4">
          {user?.profile_avatar ? (
            <img
              src={user?.profile_avatar}
              alt={`${user?.full_name}'s avatar`}
              className="w-24 h-24 rounded-full border-4 border-[#8734A3] cursor-pointer"
              onClick={openModal} // Open modal on click
            />
          ) : (
            <Avatar
              className="w-24 h-24 rounded-full border-4 border-[#8734A3] text-gray-600 cursor-pointer"
              sx={{
                width: 90,
                height: 90,
                marginRight: 1,
                background: "#8734A3",
              }}
            >
              {getFirstLetter(user?.full_name || "User")}
            </Avatar>
          )}
          <AvatarModal
            open={isModalOpen}
            handleClose={closeModal}
            imageUrl={user?.profile_avatar}
          />
          <div className="ml-4">
            <h2 className="text-2xl font-semibold">{user?.full_name}</h2>
            <p className="text-gray-600">{user?.email}</p>
            <span
              className={`inline-block mt-2 px-3 py-1 text-sm font-semibold rounded-full ${
                user?.status === "verified"
                  ? "bg-green-200 text-green-800"
                  : "bg-red-200 text-red-800"
              }`}
            >
              {user?.status === "verified" ? "Verified" : "Not Verified"}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-y-4">
          <Detail label="Phone" value={user?.phone || "N/A"} />
          <Detail
            label="Date of Birth"
            value={formatDate(user?.dob) || "N/A"}
          />
          <Detail label="Role" value={user?.role.name || "N/A"} />
          <Detail
            label="Permissions"
            value={
              getPermissionNames(user?.role.permissions || []).length > 0 ? (
                <ul className="list-disc ml-5">
                  {getPermissionNames(user?.role.permissions || []).map(
                    (permission, index) => (
                      <li key={index}>
                        <span className="font-medium">
                          {permission.category}:
                        </span>{" "}
                        <span
                          className={`${
                            permission.action === "CREATE"
                              ? "text-green-600"
                              : permission.action === "READ"
                              ? "text-blue-600"
                              : permission.action === "UPDATE"
                              ? "text-orange-600"
                              : permission.action === "DELETE"
                              ? "text-red-600"
                              : ""
                          } ml-1`}
                        >
                          {permission.action}
                        </span>
                      </li>
                    )
                  )}
                </ul>
              ) : (
                "N/A"
              )
            }
          />
        </div>
      </div>
    </div>
  );
};

const Detail = ({ label, value, className = "" }) => (
  <div className={`flex flex-col ${className}`}>
    <p className="text-sm text-[#666666]">{label}</p>
    <p className="text-base">{value}</p>
  </div>
);

export default MyProfile;
