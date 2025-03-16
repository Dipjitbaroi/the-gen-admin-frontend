import { ArrowBack } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  useCreateRoleMutation,
  useGetPermissionQuery,
} from "../services/apiConfig";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddRole = () => {
  const [createRole] = useCreateRoleMutation();
  const [selectedPermissions, setSelectedPermissions] = useState({});
  const [initialPermissions, setInitialPermissions] = useState({});
  const [roleName, setRoleName] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const sessionData = location.state?.session;

  useEffect(() => {
    if (sessionData) {
      const initialPermissions = {};
      sessionData.permissions.forEach((permission) => {
        initialPermissions[permission] = true;
      });
      setSelectedPermissions(initialPermissions);
      setInitialPermissions(initialPermissions); // Save the initial permissions to reset later
    }
  }, [sessionData]);

  const handleCreateRole = async () => {
    try {
      const result = await createRole({
        body: {
          name: roleName,
          permissions: Object.keys(selectedPermissions).filter(
            (permission) => selectedPermissions[permission]
          ),
        },
      }).unwrap();
      toast.success(result.data.message || "Role successfully added.");
      // Reset the state values
      setRoleName("");
      setSelectedPermissions({});
    } catch (error) {
      const errorMessage =
        error.data?.message || "Failed to create role. Please try again later.";
      toast.error(errorMessage);
    }
  };

  const { data: permissions, error } = useGetPermissionQuery();

  useEffect(() => {
    if (error) {
      const errorMessage =
        error.data?.message ||
        "Failed to fetch permissions. Please try again later.";
      toast.error(errorMessage);
    }
  }, [error]);

  const handlePermissionChange = (event, permission) => {
    setSelectedPermissions({
      ...selectedPermissions,
      [permission]: event.target.checked,
    });
  };

  const handleCancelClick = () => {
    setSelectedPermissions(initialPermissions);
  };

  const handleBackClick = () => {
    setSelectedPermissions(initialPermissions);
    navigate(-1);
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center h-12 mb-6">
        <div className="flex h-full items-center">
          <button className="mr-2" onClick={handleBackClick}>
            <ArrowBack />
          </button>
          {/* <div className="h-full"> */}
            <input
              type="text"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
              placeholder="Name"
              className="h-full  border-2 border-[#8734A3] rounded-md shadow-sm py-2 px-3"
            />
          {/* </div> */}
        </div>
        <div className="flex h-full gap-2">
          <button
            className="border-2 border-[#8734A3] hover:bg-gray-200 text-[#8734A3] py-2 px-6 rounded-lg font-semibold h-full"
            onClick={handleCancelClick}
          >
            Cancel
          </button>
          <button
            className="bg-[#8734A3] hover:bg-[#742985] text-white py-2 px-6 rounded-lg font-semibold h-full"
            onClick={handleCreateRole}
          >
            Save
          </button>
        </div>
      </div>
      <div className="p-4 bg-white rounded-xl">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-4 px-4 border-b">Modules</th>
              <th className="py-4 px-4 border-b">Add</th>
              <th className="py-4 px-4 border-b">View</th>
              <th className="py-4 px-4 border-b">Modify</th>
              <th className="py-4 px-4 border-b">Delete</th>
            </tr>
          </thead>
          <tbody className="border">
            {permissions &&
              Object.entries(permissions).map(([module, actions]) => (
                <tr key={module} className="h-12">
                  <td className="py-4 px-4 border-b capitalize">
                    {formatModuleName(module)}
                  </td>
                  <td className="py-4 px-4 border-b text-center">
                    <Checkbox
                      checked={!!selectedPermissions[actions.CREATE]}
                      onChange={(e) =>
                        handlePermissionChange(e, actions.CREATE)
                      }
                    />
                  </td>
                  <td className="py-4 px-4 border-b text-center">
                    <Checkbox
                      checked={!!selectedPermissions[actions.READ]}
                      onChange={(e) => handlePermissionChange(e, actions.READ)}
                    />
                  </td>
                  <td className="py-4 px-4 border-b text-center">
                    <Checkbox
                      checked={!!selectedPermissions[actions.UPDATE]}
                      onChange={(e) =>
                        handlePermissionChange(e, actions.UPDATE)
                      }
                    />
                  </td>
                  <td className="py-4 px-4 border-b text-center">
                    <Checkbox
                      checked={!!selectedPermissions[actions.DELETE]}
                      onChange={(e) =>
                        handlePermissionChange(e, actions.DELETE)
                      }
                    />
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

// Helper function to format module names
const formatModuleName = (name) => {
  return name
    .replace(/_/g, " ") // Replace underscores with spaces
    .toLowerCase() // Convert to lowercase
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter of each word
};

// Checkbox component
const Checkbox = ({ checked, onChange }) => (
  <input
    type="checkbox"
    checked={checked}
    onChange={onChange}
    className="w-6 h-6 text-purple-600 border-purple-600"
  />
);

export default AddRole;
