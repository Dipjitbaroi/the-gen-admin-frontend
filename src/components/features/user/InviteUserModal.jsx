import { toast, ToastContainer } from "react-toastify";
import { useInviteUserMutation } from "../../../services/apiConfig";
import { useState } from "react";
import { IconButton, TextField } from "@mui/material";
import { Close } from "@mui/icons-material";

const InviteUserModal = ({ open, onClose }) => {
  const [email, setEmail] = useState("");
  const [inviteUser, { isLoading }] = useInviteUserMutation();

  const handleInviteUser = async () => {
    try {
      const response = await inviteUser({ email }).unwrap();
      console.log("Invite successful:", response);

      // Optionally, close the modal or show a success message
      toast.success("User invite sent successfully!");
    } catch (error) {
      toast.error(`Invite request failed. ${error.data.message}`);
    }
  };
  const handleClose = () => {
    setEmail(""); // Reset email input
    onClose(); // Call the onClose function passed from the parent component
  };

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-xl">
          <div className="flex justify-between items-center pb-2 mb-4">
            <h2 className="text-2xl font-bold">Invite User</h2>
            <IconButton onClick={handleClose}>
              <Close />
            </IconButton>
          </div>
          <div className="mt-4">
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mb-4"
            />
            <div className="flex w-full justify-end mt-4">
              <button
                className="w-auto bg-[#8734A3] hover:bg-[#742985] text-white font-semibold py-2 px-4 rounded-lg"
                onClick={handleInviteUser}
                disabled={isLoading}
              >
                Invite
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default InviteUserModal;
