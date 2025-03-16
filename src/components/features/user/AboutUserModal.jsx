import { Close } from "@mui/icons-material";
import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  useForgotPasswordMutation,
  useGetRoleQuery,
  useUpdateAdminInfoMutation,
} from "../../../services/apiConfig";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AboutUserModal = ({ open, onClose, rowData }) => {
  const [user, setUser] = useState({
    full_name: "",
    role: {},
    phone: "",
    email: "",
    dob: null,
  });

  const [initialUser, setInitialUser] = useState({});

  const { data: roles } = useGetRoleQuery(); // Fetch roles
  const [updateAdminInfo, { isLoading: isUpdating }] = useUpdateAdminInfoMutation();
  const [forgetPassword, { isLoading: isResetting }] = useForgotPasswordMutation();

  useEffect(() => {
    if (rowData && roles) {
      // Check if roles is available
      const formattedRowData = {
        ...rowData,
        dob: rowData.dob ? dayjs(rowData.dob) : null, // Convert dob to Dayjs object
        role: roles.find((role) => role.name === rowData.role) || {}, // Find role by name
      };
      setUser(formattedRowData);
      setInitialUser(formattedRowData); // Store initial state for comparison
    }
  }, [rowData, roles]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    setUser((prevUser) => ({
      ...prevUser,
      dob: date,
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

  const handleSave = async () => {
    try {
      const updatedFields = {};

      if (user.full_name !== initialUser.full_name)
        updatedFields.full_name = user.full_name;
      if (user.email !== initialUser.email) updatedFields.email = user.email;
      if (user.phone !== initialUser.phone) updatedFields.phone = user.phone;
      if (user.dob !== initialUser.dob) updatedFields.dob = user.dob;
      if (user.role._id !== initialUser.role._id)
        updatedFields.role = { _id: user.role._id, name: user.role.name };

      if (Object.keys(updatedFields).length === 0) {
        toast.info("No changes detected.");
        return;
      }

      await updateAdminInfo({
        id: rowData._id,
        updateData: updatedFields,
      }).unwrap();

      // Ensure updated data reflects in state
      setUser((prevUser) => ({
        ...prevUser,
        ...updatedFields,
      }));
      setInitialUser((prevUser) => ({
        ...prevUser,
        ...updatedFields,
      }));

      toast.success("User info updated successfully");
    } catch (error) {
      const errorMessage =
        error.data?.message ||
        "Failed to update user info. Please try again later.";
      toast.error(errorMessage);
    }
  };

  const handleResetPass = async () => {
    try {
      const res = await forgetPassword({ email: user.email }).unwrap();
      toast.success(res.message || "Password reset link sent to your email");
    } catch (error) {
      const errorMessage =
        error.data?.message || "Something went wrong! Please try again.";
      toast.error(errorMessage);
    }
  };

  const handleCancel = () => {
    // Reset user state to initialUser
    setUser(initialUser);
  };

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xl">
        <div className="flex justify-between items-center pb-2 mb-4">
          <h2 className="text-lg font-medium">About The User</h2>
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
              value={user?.role?._id || ""}
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
          <div className="flex w-full justify-end">
            <button
              onClick={handleCancel}
              className="text-red-500 hover:text-red-700 mb-4"
            >
              Cancel
            </button>
          </div>
          <div className="flex w-full justify-between">
            <button
              onClick={handleResetPass}
              className="border-2 border-[#8734A3] text-[#8734A3] py-2 px-4 rounded-lg font-semibold"
              disabled={isResetting}
            >
              {isResetting ? "Resetting..." : "Reset Password"}
            </button>
            <button
              onClick={handleSave}
              className="border-2 border-[#8734A3] bg-[#8734A3] text-white py-2 px-4 rounded-lg font-semibold"
              disabled={isUpdating}
            >
              {isUpdating ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default AboutUserModal;
