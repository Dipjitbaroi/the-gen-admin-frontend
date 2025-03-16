import React from "react";
import { Modal } from "@mui/material";
import { Close } from "@mui/icons-material";
import { useCreateRefundMutation } from "../../../services/apiConfig";
import { toast, ToastContainer } from "react-toastify";

const TransactionModal = ({ open, onClose, rowData }) => {
  const [createRefund, { isLoading }] = useCreateRefundMutation();

  const handleRefundRequest = async () => {
    try {
      const refundData = {
        id: rowData._id, // Transaction ID
        reason: "Transaction refund request", // Customize as needed
        amount: rowData.amount, // Amount from transaction data
      };

      const response = await createRefund(refundData).unwrap();

      // Optionally, close the modal or show a success message
      toast.success(response.message || "Refund successful.");
    } catch (error) {
      toast.error(`Refund request failed. ${error.data.message}`);
    }
  };

  const renderTransactionDetails = () => (
    <div className="grid grid-cols-2 gap-6">
      <Detail label="Transaction ID" value={rowData._id} />
      <Detail label="Type" value={rowData.type} />
      {rowData.type === "session" && (
        <Detail label="Recipient" value={rowData.recipient} />
      )}
      {rowData.type === "session" && (
        <Detail label="Payee" value={rowData.user} />
      )}
      {rowData.type !== "session" && (
        <Detail label="User" value={rowData.user} />
      )}
      <Detail label="Date & Time" value={rowData.completed_at} />
      <Detail label="Payment Method" value={rowData.payment_method} />
      <Detail label="Amount" value={rowData.amount} />
    </div>
  );

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-white rounded-xl shadow-lg w-fit max-w-2xl mx-auto p-4">
            <button
              className="absolute p-2 rounded-full top-3 right-3 hover:bg-gray-100"
              onClick={onClose}
            >
              <Close sx={{ color: "#8734A3" }} />
            </button>
            <div className="border-gray-300 pb-2 mb-4">
              <h2 className="text-xl font-bold">Transaction Details</h2>
            </div>
            {renderTransactionDetails()}
            {rowData.type === "session" && (
              <div className="w-full flex justify-end">
                <button
                  className="mt-6 bg-[#8734A3] text-white font-semibold py-2 px-4 rounded-lg hover:bg-[#742985] disabled:bg-gray-400"
                  onClick={handleRefundRequest}
                  disabled={isLoading} // Disable button while loading
                >
                  {isLoading ? "Processing..." : "Request Refund"}
                </button>
              </div>
            )}
          </div>
        </div>
      </Modal>
      <ToastContainer />
    </>
  );
};

const Detail = ({ label, value }) => (
  <div>
    <div className="text-sm text-[#666666]">{label}</div>
    <div className="text-base">{value}</div>
  </div>
);

export default TransactionModal;
