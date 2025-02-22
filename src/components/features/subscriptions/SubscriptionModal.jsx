import { Modal, Box, Typography, Button } from "@mui/material";

const SubscriptionModal = ({ open, onClose, data }) => {
  if (!data) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <Box className="p-6 bg-white rounded-lg shadow-lg w-full max-w-md mx-auto mt-20">
        <Typography variant="h6" className="font-bold mb-4">
          {data.title} Plan Details
        </Typography>
        <ul className="mb-4 space-y-2 text-gray-700">
          {data.details?.map((detail, index) => (
            <li key={index} className="text-sm">
              {detail}
            </li>
          ))}
        </ul>
        <Typography className="mb-2 text-sm text-gray-500">
          Audience: {data.audience}
        </Typography>
        <Typography className="mb-6 text-lg font-semibold text-gray-800">
          {data.price}
        </Typography>
        <Button variant="contained" onClick={onClose}>
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default SubscriptionModal;
