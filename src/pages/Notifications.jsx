import { useState } from "react";
import NotificationModal from "../components/features/notifications/NotificationModal.jsx";
import NotificationTabs from "../components/features/notifications/NotificationTabs.jsx";
import PaginationLayout from "../components/layout/Pagination/pagination.jsx";

const Notifications = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="p-8 w-full h-full flex flex-col justify-between">
      {/* Header */}
      <div>
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
        <NotificationTabs />

        {/* Notification Modal */}
        <NotificationModal
          open={openModal}
          onClose={() => setOpenModal(false)}
        />
      </div>

      <PaginationLayout />
    </div>
  );
};

export default Notifications;
