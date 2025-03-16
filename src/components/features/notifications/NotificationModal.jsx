import React from "react";
import { Modal } from "@mui/material";
import { Close } from "@mui/icons-material";

const NotificationModal = ({ open, onClose, rowData }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="relative bg-white rounded-xl shadow-lg w-full max-w-md mx-auto p-4">
          <button
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            <Close
              sx={{
                color: "#8734A3",
              }}
            />
          </button>
          <div className=" border-gray-300 pb-2 mb-4">
            <h2 className="text-xl font-bold">Notification Details</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-[#666666]">Title</div>
              <div className="text-base">{rowData._id}</div>
            </div>

            <div>
              <div className="text-sm text-[#666666]">Published On</div>
              <div className="text-base">{rowData.type}</div>
            </div>

            <div>
              <div className="text-sm text-[#666666]">Audience</div>
              <div className="text-base">{rowData.user}</div>
            </div>

            <div>
              <div className="text-sm text-[#666666]">Created by</div>
              <div className="text-base">{rowData.completed_at}</div>
            </div>

            <div>
              <div className="text-sm text-[#666666]">Type</div>
              <div className="text-base">{rowData.amount}</div>
            </div>

            <div>
              <div className="text-sm text-[#666666]">Recurring</div>
              <div className="text-base">{rowData.payment_method}</div>
            </div>

            <div>
              <div className="text-sm text-[#666666]">Content</div>
              <div className="text-base">{rowData.payment_method}</div>
            </div>
          </div>
          <div className="w-full flex justify-end">
            <button
              className="mt-6 bg-[#8734A3] text-white font-semibold py-2 px-4 rounded-lg hover:bg-[#68297C]"
              onClick={onClose}
            >
              Resend
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default NotificationModal;
