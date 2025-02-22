import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import home from "../../../assets/home.png";
import home_colored from "../../../assets/home_colored.png";
import loyalty from "../../../assets/loyalty.png";
import calendar from "../../../assets/calendar_month.png";
import calendar_colored from "../../../assets/calendar_month_colored.png";
import receipt from "../../../assets/receipt_long.png";
import receipt_colored from "../../../assets/receipt_long_colored.png";
import group from "../../../assets/group.png";
import group_colored from "../../../assets/group_colored.png";
import notification from "../../../assets/notification_add.png";
import notification_colored from "../../../assets/notification_add_colored.png";
import flag from "../../../assets/flag_2.png";
import flag_colored from "../../../assets/flag_2_colored.png";
import leaderboard from "../../../assets/leaderboard.png";
import leaderboard_colored from "../../../assets/leaderboard_colored.png";

const Sidebar = () => {
  const sidebarLinks = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: home,
      selected_icon: home_colored,
    },
    {
      title: "Subscriptions",
      path: "/subscriptions",
      icon: loyalty,
      selected_icon: home_colored,
    },
    {
      title: "Sessions",
      path: "/sessions",
      icon: calendar,
      selected_icon: calendar_colored,
    },
    {
      title: "Transactions",
      path: "/transactions",
      icon: receipt,
      selected_icon: receipt_colored,
    },
    {
      title: "People",
      children: [
        { title: "User Management", path: "/users" },
        { title: "Role Management", path: "/roles" },
      ],
      icon: group,
      selected_icon: group_colored,
    },
    {
      title: "Notifications",
      path: "/notifications",
      icon: notification,
      selected_icon: notification_colored,
    },
    {
      title: "Support Requests",
      path: "/support",
      icon: flag,
      selected_icon: flag_colored,
    },
    {
      title: "Analytics",
      path: "/analytics",
      icon: leaderboard,
      selected_icon: leaderboard_colored,
    },
  ];

  const location = useLocation();
  const [isPeopleDropdownOpen, setIsPeopleDropdownOpen] = useState(false);

  return (
    <div className="w-64 bg-white shadow-lg min-h-full">
      <div className="p-4">
        <img src="/images/logo/logo.png" className="h-12" alt="GEN" />
      </div>
      <nav className="mt-4">
        {sidebarLinks.map((link, index) => {
          if (link.children) {
            return (
              <div key={index}>
                <button
                  onClick={() => setIsPeopleDropdownOpen(!isPeopleDropdownOpen)}
                  className={`w-full flex font-semibold items-center px-6 py-3 text-left text-gray-700 hover:bg-purple-50 ${
                    link.children.some(
                      (child) => location.pathname === child.path
                    )
                      ? "bg-purple-50 text-purple-700"
                      : ""
                  }`}
                >
                  <img
                    className="h-4 w-4 mr-2"
                    src={
                      link.children.some(
                        (child) => location.pathname === child.path
                      )
                        ? link.selected_icon
                        : link.icon
                    }
                    alt=""
                  />
                  {link.title}
                  {isPeopleDropdownOpen ? <ExpandLess /> : <ExpandMore />}
                </button>
                {isPeopleDropdownOpen && (
                  <div className="ml-4">
                    {link.children.map((child, childIndex) => (
                      <NavLink
                        key={childIndex}
                        to={child.path}
                        className={({ isActive }) =>
                          `block px-6 py-2 text-gray-600 hover:text-purple-700 hover:bg-purple-50 ${
                            isActive ? "text-purple-700 bg-purple-50" : ""
                          }`
                        }
                      >
                        {child.title}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          return (
            <NavLink
              key={index}
              to={link.path}
              className={({ isActive }) =>
                `flex items-center font-semibold px-6 py-3 text-gray-700 hover:text-purple-700 hover:bg-purple-50 ${
                  isActive ? "text-purple-700 bg-purple-50" : ""
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <img
                    className="h-4 w-4 mr-2"
                    src={isActive ? link.selected_icon : link.icon}
                    alt=""
                  />
                  {link.title}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
