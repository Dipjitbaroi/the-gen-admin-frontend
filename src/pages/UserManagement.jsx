import React from "react";
import SearchBar from "../components/layout/Searchbar/Searchbar";
import UserManagementTabs from "../components/features/user/UserManagementTabs";

const UserManagement = () => {
  const users = [
    { id: 1, name: "John Doe", email: "john.doe@example.com", role: "Admin" },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      role: "User",
    },
    {
      id: 3,
      name: "Robert Fox",
      email: "robert.fox@example.com",
      role: "Editor",
    },
  ];

  return (
    <div className="">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">User Management</h1>
        <SearchBar />
      </div>

      {/* Tabs Section */}
      <UserManagementTabs />
    </div>
  );
};

export default UserManagement;
