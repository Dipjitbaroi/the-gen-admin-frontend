import React, { useState } from "react";
import { Modal } from "@mui/material";
import { Close } from "@mui/icons-material";

const CreateNotificationModal = ({ open, onClose }) => {
  const [isRecurring, setIsRecurring] = useState(false);

  const handleRecurringChange = (e) => {
    setIsRecurring(e.target.checked);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="relative bg-white rounded-xl shadow-lg w-full max-w-xl mx-auto p-6">
          <button
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            <Close sx={{ color: "#8734A3" }} />
          </button>
          <div className="pb-2 mb-4">
            <h2 className="text-xl font-bold">Create Notification</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-700">
                Campaign Name
              </label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                placeholder="Enter Campaign Name"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700">Type</label>
              <select className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
                <option>Select Type</option>
                <option>Type 1</option>
                <option>Type 2</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-700">Audience</label>
              <select className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
                <option>Select Audience</option>
                <option>Audience 1</option>
                <option>Audience 2</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-700">Content</label>
              <textarea
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                rows="4"
                placeholder="Enter Content"
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-purple-600"
                checked={isRecurring}
                onChange={handleRecurringChange}
              />
              <label className="ml-2 text-sm text-gray-700">Recurring</label>
            </div>
            {isRecurring && (
              <div className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm text-gray-700">
                        Occurance
                      </label>
                      <select className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
                        <option>Monthly</option>
                        <option>Daily</option>
                        <option>Weekly</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700">
                        Repeat Every
                      </label>
                      <input
                        type="text"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        placeholder="1"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700">
                        Month
                      </label>
                      <select className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
                        <option>Select Month</option>
                        <option>January</option>
                        <option>February</option>
                        <option>March</option>
                        <option>April</option>
                        <option>May</option>
                        <option>June</option>
                        <option>July</option>
                        <option>August</option>
                        <option>September</option>
                        <option>October</option>
                        <option>November</option>
                        <option>December</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700">
                      On Day
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      placeholder="1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700">
                      End Date
                    </label>
                    <input
                      type="date"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="w-full flex justify-end mt-4">
            <button
              className="bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg hover:bg-purple-800"
              onClick={onClose}
            >
              Publish
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CreateNotificationModal;
