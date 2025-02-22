import { useState } from "react";
import NotificationTable from "../components/features/notifications/NotificationTable.jsx";
import NotificationModal from "../components/features/notifications/NotificationModal.jsx";

const Notifications = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Notifications</h1>
        <button
          onClick={() => setOpenModal(true)}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-purple-700"
        >
          Create Notification
        </button>
      </div>

      {/* Notifications Table */}
      <NotificationTable />

      {/* Notification Modal */}
      <NotificationModal open={openModal} onClose={() => setOpenModal(false)} />
    </div>
  );
};

export default Notifications;
