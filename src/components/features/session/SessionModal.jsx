import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

const SessionModal = ({ open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box className="p-6 bg-white rounded-lg shadow-lg w-full max-w-md mx-auto mt-20">
        <Typography variant="h6" className="font-bold mb-4">
          Session Details
        </Typography>
        <Typography className="mb-4">Topic: React Basics</Typography>
        <Typography className="mb-4">Date: 2023-01-01</Typography>
        <Typography className="mb-4">Time: 10:00 AM</Typography>
        <Button variant="contained" onClick={onClose}>
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default SessionModal;
