import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGetRoleQuery } from "../services/apiConfig";

const RoleManagement = () => {
  const navigate = useNavigate();
  const { data, error } = useGetRoleQuery();

  useEffect(() => {
    if (error) {
      const errorMessage = error.data?.message || "Failed to fetch roles. Please try again later.";
      toast.error(errorMessage);
    }
  }, [error]);

  const handleClick = (item) => {
    navigate("/roles/admin", { state: { session: item } });
  };

  const handleClickAddRole = () => {
    navigate("/roles/add-role");
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6 h-12">
        <h1 className="text-4xl font-bold text-gray-800">Role Management</h1>
        <button
          onClick={handleClickAddRole}
          className="bg-[#8734A3] hover:bg-[#742985] text-white py-2 px-6 rounded-lg font-semibold h-full"
        >
          Add Role
        </button>
      </div>
      <div className="">
        <table className="min-w-full bg-white rounded-lg">
          <thead>
            <tr>
              <th className="py-4 px-4 border-b text-start">Name</th>
              <th className="py-4 px-4 border-b text-start">Description</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((item, index) => (
                <tr key={index} onClick={() => handleClick(item)} className="h-12 hover:bg-gray-100">
                  <td className="py-4 px-4 border-b">{item.name}</td>
                  <td className="py-4 px-4 border-b">
                    {item.description || "No description available"}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
};

export default RoleManagement;
