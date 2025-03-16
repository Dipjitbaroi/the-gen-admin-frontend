import { ArrowBack } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  useGetPermissionQuery,
  useUpdateRoleMutation,
} from "../services/apiConfig";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminPage = () => {
  const [updateRole] = useUpdateRoleMutation();
  const [isModifyMode, setIsModifyMode] = useState(false);
  const [selectedPermissions, setSelectedPermissions] = useState({});
  const [initialPermissions, setInitialPermissions] = useState({});
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

  const handleUpdateRole = async () => {
    try {
      await updateRole({
        id: sessionData._id,
        updateData: {
          permissions: Object.keys(selectedPermissions).filter(
            (permission) => selectedPermissions[permission]
          ),
        },
      }).unwrap();
      toast.success("Role successfully updated.");
    } catch (error) {
      const errorMessage =
        error.data?.message || "Failed to update role. Please try again later.";
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

  const handleModifyClick = () => {
    setIsModifyMode(!isModifyMode);
    if (isModifyMode) {
      handleUpdateRole();
    }
  };

  const handleCancelClick = () => {
    setSelectedPermissions(initialPermissions); // Reset to initial permissions
    setIsModifyMode(false);
  };

  const handleBackClick = () => {
    setSelectedPermissions(initialPermissions); // Reset to initial permissions
    navigate(-1);
  };

  const handlePermissionChange = (event, permission) => {
    setSelectedPermissions({
      ...selectedPermissions,
      [permission]: event.target.checked,
    });
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center h-12 mb-6">
        <div className="flex items-center">
          <button className="mr-2" onClick={handleBackClick}>
            <ArrowBack />
          </button>
          <h5 className="ml-2 text-3xl font-semibold">{sessionData.name}</h5>
        </div>
        {isModifyMode ? (
          <div className="flex gap-2">
            <button
              className="border-2 border-[#8734A3] hover:bg-gray-200 text-[#8734A3] py-2 px-4 rounded-lg font-semibold"
              onClick={handleCancelClick}
            >
              Cancel
            </button>
            <button
              className="bg-[#8734A3] hover:bg-[#742985] text-white py-2 px-4 rounded-lg font-semibold"
              onClick={handleModifyClick}
            >
              Save
            </button>
          </div>
        ) : (
          <button
            onClick={handleModifyClick}
            className="bg-[#8734A3] hover:bg-[#742985] text-white py-2 px-6 rounded-lg font-semibold h-full"
          >
            Modify
          </button>
        )}
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
                    {isModifyMode ? (
                      <Checkbox
                        defaultChecked={!!selectedPermissions[actions.CREATE]}
                        onChange={(e) =>
                          handlePermissionChange(e, actions.CREATE)
                        }
                      />
                    ) : (
                      selectedPermissions[actions.CREATE] && <CheckIcon />
                    )}
                  </td>
                  <td className="py-4 px-4 border-b text-center">
                    {isModifyMode ? (
                      <Checkbox
                        defaultChecked={!!selectedPermissions[actions.READ]}
                        onChange={(e) =>
                          handlePermissionChange(e, actions.READ)
                        }
                      />
                    ) : (
                      selectedPermissions[actions.READ] && <CheckIcon />
                    )}
                  </td>
                  <td className="py-4 px-4 border-b text-center">
                    {isModifyMode ? (
                      <Checkbox
                        defaultChecked={!!selectedPermissions[actions.UPDATE]}
                        onChange={(e) =>
                          handlePermissionChange(e, actions.UPDATE)
                        }
                      />
                    ) : (
                      selectedPermissions[actions.UPDATE] && <CheckIcon />
                    )}
                  </td>
                  <td className="py-4 px-4 border-b text-center">
                    {isModifyMode ? (
                      <Checkbox
                        defaultChecked={!!selectedPermissions[actions.DELETE]}
                        onChange={(e) =>
                          handlePermissionChange(e, actions.DELETE)
                        }
                      />
                    ) : (
                      selectedPermissions[actions.DELETE] && <CheckIcon />
                    )}
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

// Checkmark icon
const CheckIcon = () => (
  <div className="flex justify-center items-center">
    <svg
      className="w-6 h-6 text-purple-600"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M5 13l4 4L19 7"
      ></path>
    </svg>
  </div>
);

// Checkbox component
const Checkbox = ({ defaultChecked, onChange }) => (
  <input
    type="checkbox"
    defaultChecked={defaultChecked}
    onChange={onChange}
    className="w-6 h-6 text-purple-600 border-purple-600"
  />
);

export default AdminPage;
