import React from "react";

import GeneralTable from "../components/layout/Table/GeneralTable";

const RoleManagement = () => {
  const rows = [
    { name: "asdf", description: "Admin"},
    { name: "asdf", description: "Admin"},
    { name: "asdf", description: "Admin"},
  ];

  const cols= [
    {id:"name", label:"Name"},
    {id:"description", label:"Description"},
  ]

  return (
    <div className="">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Role Management</h1>
      <div className="bg-white rounded-lg shadow-md">
        <GeneralTable columns={cols} data={rows}/>
      </div>
    </div>
  );
};

export default RoleManagement;
