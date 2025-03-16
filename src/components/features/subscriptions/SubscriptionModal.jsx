import React, { useState, useEffect } from "react";
import { Visibility, Close } from "@mui/icons-material";
import {
  Modal,
  Box,
  Typography,
  Button,
  TextField,
  List,
  ListItem,
  IconButton,
} from "@mui/material";
import { useUpdateSubscriptionMutation } from "../../../services/apiConfig";
import { toast, ToastContainer } from "react-toastify";

const SubscriptionModal = ({ open, onClose, data }) => {
  const [updateSubscription] = useUpdateSubscriptionMutation();
  const [subscriptionData, setSubscriptionData] = useState({
    newPrice: data.price || "",
    description: data.description || "",
    benefits: data.benefits || [],
  });

  useEffect(() => {
    setSubscriptionData({
      newPrice: data.price || "",
      description: data.description || "",
      benefits: data.benefits || [],
    });
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSubscriptionData({
      ...subscriptionData,
      [name]: value,
    });
  };

  const handleUpdateSubscription = async () => {
    try {
      await updateSubscription({
        id: data._id,
        updateData: subscriptionData,
      }).unwrap();
      toast.success("Subscription updated successfully!");
    } catch (error) {
      toast.error("Failed to update subscription.");
    }
  };

  const handleClose = () => {
    setSubscriptionData({
      newPrice: data.price || "",
      description: data.description || "",
      benefits: data.benefits || [],
    });
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box className="p-6 bg-white rounded-xl shadow-lg w-full max-w-md mx-auto mt-20 relative">
        <div className="w-full flex justify-between">
          <div>
            <Typography variant="h6" className="font-bold mb-4">
              {data.name}
            </Typography>
            <div className="flex">
              <Visibility className="text-gray-500 mr-1" />
              <p className="text-sm text-gray-500">
                {data?.name?.toLowerCase() === "pro" ? "Peer" : "Everyone"}
              </p>
            </div>
          </div>
          <div>
            <IconButton onClick={handleClose} className="w-fit">
              <Close
                sx={{
                  color: "#8734A3",
                }}
              />
            </IconButton>
          </div>
        </div>
        <TextField
          label="Description"
          name="description"
          variant="outlined"
          fullWidth
          margin="normal"
          value={subscriptionData.description}
          onChange={handleChange}
        />
        <TextField
          label="New Price"
          name="newPrice"
          variant="outlined"
          fullWidth
          margin="normal"
          value={subscriptionData.newPrice}
          onChange={handleChange}
        />
        <Typography variant="subtitle1" className="font-bold mb-2">
          Benefits ({subscriptionData.benefits.length})
        </Typography>
        <List className="mb-4 space-y-2 text-gray-700">
          {subscriptionData.benefits.map((benefit, index) => (
            <ListItem key={index} className="text-sm">
              {benefit}
            </ListItem>
          ))}
        </List>
        <div className="flex justify-end w-full">
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#8734A3",
              "&:hover": { backgroundColor: "#68297C" },
            }}
            className="w-fit"
            onClick={handleUpdateSubscription}
          >
            Update Subscription
          </Button>
        </div>
        <ToastContainer />
      </Box>
    </Modal>
  );
};

export default SubscriptionModal;
