import { Close } from "@mui/icons-material";
import {
  IconButton,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  useCreateAdminMutation,
  useGetRoleQuery,
} from "../../../services/apiConfig";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";

const InviteAdminModal = ({ open, onClose }) => {
  const [user, setUser] = useState({
    full_name: "",
    role: {},
    phone: "",
    email: "",
    dob: null,
  });

  const { data: roles } = useGetRoleQuery(); // Fetch roles
  const [createAdmin, { isLoading }] = useCreateAdminMutation();

  useEffect(() => {
    if (!open) {
      // Reset the user state when the modal is closed
      setUser({
        full_name: "",
        role: {},
        phone: "",
        email: "",
        dob: null,
      });
    }
  }, [open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleRoleChange = (e) => {
    const selectedRole = roles.find((role) => role._id === e.target.value);
    setUser((prevUser) => ({
      ...prevUser,
      role: selectedRole
        ? { _id: selectedRole._id, name: selectedRole.name }
        : {},
    }));
  };

  const handleDateChange = (date) => {
    setUser((prevUser) => ({
      ...prevUser,
      dob: date,
    }));
  };

  const handleSave = async () => {
    try {
      await createAdmin({
        body: {
          full_name: user.full_name,
          email: user.email,
          phone: user.phone,
          dob: user.dob,
          role: user.role,
        },
      }).unwrap();
      toast.success("Admin created successfully!");
    } catch (error) {
      const errorMessage =
        error.data?.message ||
        "Failed to create admin. Please try again later.";
      toast.error(errorMessage);
    }
  };

  const handleCancel = () => {
    setUser({
      full_name: "",
      role: {},
      phone: "",
      email: "",
      dob: null,
    });
  };

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xl">
        <div className="flex justify-between items-center pb-2 mb-4">
          <h2 className="text-2xl font-medium">Invite Admin</h2>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </div>
        <div className="space-y-4">
          <FormControl fullWidth>
            <TextField
              label="Full Name"
              name="full_name"
              value={user.full_name}
              onChange={handleChange}
              variant="outlined"
            />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="role-label">Role</InputLabel>
            <Select
              labelId="role-label"
              name="role"
              value={user.role?._id || ""}
              onChange={handleRoleChange}
              label="Role"
            >
              {roles?.map((role) => (
                <MenuItem key={role._id} value={role._id}>
                  {role.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <TextField
              label="Phone"
              name="phone"
              value={user.phone}
              onChange={handleChange}
              variant="outlined"
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              label="Email"
              name="email"
              value={user.email}
              onChange={handleChange}
              variant="outlined"
            />
          </FormControl>
          <FormControl fullWidth>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Select Date"
                value={user.dob}
                onChange={handleDateChange}
                renderInput={(params) => <TextField {...params} />}
                className="w-full rounded-md"
              />
            </LocalizationProvider>
          </FormControl>
        </div>
        <div className="items-center mt-4">
          <div className="flex w-full justify-between">
            <button
              onClick={handleCancel}
              className="border-2 border-[#8734A3] text-[#8734A3] py-2 px-4 rounded-lg font-semibold"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="border-2 border-[#8734A3] bg-[#8734A3] text-white py-2 px-4 rounded-lg font-semibold"
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Create Admin"}
            </button>
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default InviteAdminModal;
