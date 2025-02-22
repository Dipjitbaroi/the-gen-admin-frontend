import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

const TransactionModal = ({ open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box className="p-6 bg-white rounded-lg shadow-lg w-full max-w-md mx-auto mt-20">
        <Typography variant="h6" className="font-bold mb-4">
          Transaction Details
        </Typography>
        <Typography className="mb-4">ID: #001</Typography>
        <Typography className="mb-4">Type: Subscription</Typography>
        <Typography className="mb-4">Amount: $100</Typography>
        <Typography className="mb-6">Date: 2023-01-01</Typography>
        <Button variant="contained" onClick={onClose}>
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default TransactionModal;
