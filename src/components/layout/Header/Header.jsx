import React, { useState } from "react";
import { Avatar, Divider, ListItemIcon, MenuItem } from "@mui/material";
import { Settings, Notifications, ExitToApp, Logout } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../config/authContext";
import { useGetProfileQuery } from "../../../services/apiConfig"; // Import the query hook
import bell from "../../../assets/bell.png";
import settings from "../../../assets/settings.png";

const Header = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { data: resData } = useGetProfileQuery(); // Fetch user data
  const user = resData?.data; // Extract user data

  const handleLogout = () => {
    logout();
    navigate("/login"); // Redirect after logout
  };

  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const handleProfileClick = () => {
    navigate("/my-profile"); // Redirect to profile page without logging out
  };

  const getFirstLetter = (name) => {
    if (!name) return "U";
    return name.charAt(0).toUpperCase();
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="flex items-center justify-end px-8">
        <button className="p-4 border-r hover:bg-gray-100">
          <img src={settings} className="w-5 h-5 text-gray-600" />
        </button>
        <button className="p-4 border-r hover:bg-gray-100">
          <img src={bell} className="w-5 h-5 text-gray-600" />
        </button>
        <div className="relative">
          <div className="p-4 flex items-center hover:bg-gray-100" onClick={toggleMenu}>
            {user?.profile_avatar ? (
              <img src={user.profile_avatar} alt="Profile" className="w-8 h-8 rounded-full border-[#8734A3] border-2" />
            ) : (
              <Avatar
                sx={{
                  width: 30,
                  height: 30,
                  marginRight: 1,
                  background: "#8734A3",
                }}
              >
                {getFirstLetter(user?.full_name || "User")}
              </Avatar>
            )}
            <span className="ml-2 text-lg font-medium ">{user?.full_name || "User"}</span>
          </div>
          {isMenuOpen && (
            <div className="absolute right-0 w-full bg-white shadow-lg rounded-b-lg z-50">
              <MenuItem onClick={handleProfileClick}>
                <Avatar
                  sx={{
                    width: 30,
                    height: 30,
                    marginRight: 1,
                    background: "#666666",
                  }}
                >
                </Avatar>
                Profile
              </MenuItem>
              <div className="w-full border-b"></div>
              <MenuItem onClick={handleLogout} className="h-12">
                <ListItemIcon>
                  <Logout fontSize="small" sx={{ color: "black" }} />
                </ListItemIcon>
                Logout
              </MenuItem>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
