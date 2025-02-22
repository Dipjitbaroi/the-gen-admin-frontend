import React, {useState} from 'react';
import { NavLink, useLocation } from "react-router-dom";
import {
    ExpandMore,
    ExpandLess,
} from "@mui/icons-material";

const Sidebar = () => {
    const sidebarLinks = [
        { title: "Dashboard", path: "/" },
        { title: "Subscriptions", path: "/subscriptions" },
        { title: "Sessions", path: "/sessions" },
        { title: "Transactions", path: "/transactions" },
        { title: "Analytics", path: "/analytics" },
        {
            title: "People",
            children: [
                { title: "User Management", path: "/users" },
                { title: "Role Management", path: "/roles" },
            ],
        },
        { title: "Notifications", path: "/notifications" },
        { title: "Support Requests", path: "/support" },
    ];

    const location = useLocation();
    const [isPeopleDropdownOpen, setIsPeopleDropdownOpen] = useState(false);

    return (
        <div className="w-64 bg-white shadow-lg min-h-full">
            <div className="p-4">
                <img src="/images/logo/logo.png" className="h-12" alt="GEN"/>
            </div>
            <nav className="mt-4">
                {sidebarLinks.map((link, index) => {
                    if (link.children) {
                        return (
                            <div key={index}>
                                <button
                                    onClick={() =>
                                        setIsPeopleDropdownOpen(!isPeopleDropdownOpen)
                                    }
                                    className={`w-full flex items-center px-6 py-3 text-left text-gray-700 hover:bg-purple-50 ${
                                        link.children.some(
                                            (child) => location.pathname === child.path
                                        )
                                            ? "bg-purple-50 text-purple-700"
                                            : ""
                                    }`}
                                >
                                    {link.title}
                                    {isPeopleDropdownOpen ? <ExpandLess/> : <ExpandMore/>}
                                </button>
                                {isPeopleDropdownOpen && (
                                    <div className="ml-4">
                                        {link.children.map((child, childIndex) => (
                                            <NavLink
                                                key={childIndex}
                                                to={child.path}
                                                className={({isActive}) =>
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
                            className={({isActive}) =>
                                `block px-6 py-3 text-gray-700 hover:text-purple-700 hover:bg-purple-50 ${
                                    isActive ? "text-purple-700 bg-purple-50" : ""
                                }`
                            }
                        >
                            {link.title}
                        </NavLink>
                    );
                })}
            </nav>
        </div>
    );
};

export default Sidebar;