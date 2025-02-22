import React, { useState } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";

const NotificationModal = ({ open, onClose }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    console.log({ title, content });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box className="p-6 bg-white rounded-lg shadow-lg w-full max-w-md mx-auto mt-20">
        <Typography variant="h6" className="font-bold mb-4">
          Create Notification
        </Typography>
        <TextField
          fullWidth
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mb-4"
        />
        <TextField
          fullWidth
          multiline
          rows={4}
          label="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="mb-6"
        />
        <div className="flex justify-end">
          <Button variant="outlined" onClick={onClose} className="mr-4">
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Save
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default NotificationModal;
