import { useState } from "react";
import NotificationTabs from "../components/features/notifications/NotificationTabs.jsx";
import PaginationLayout from "../components/layout/Pagination/pagination.jsx";
import CreateNotificationModal from "../components/features/notifications/CreateNotifiactionModal.jsx";

const Notifications = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="w-full h-full flex flex-col justify-between">
      {/* Header */}
      <div>
        <div className="flex justify-between items-center h-12 mb-6">
          <h1 className="text-4xl font-bold text-gray-800">Notifications</h1>
          <button
            onClick={() => setOpenModal(true)}
            className="bg-[#8734A3] hover:bg-[#742985] text-white py-2 px-6 rounded-lg font-semibold h-full"
          >
            New Campaign
          </button>
        </div>

        {/* Notifications Table */}
        <NotificationTabs />

        {/* Notification Modal */}
        <CreateNotificationModal
          open={openModal}
          onClose={() => setOpenModal(false)}
        />
      </div>

      <PaginationLayout type={"notifications"} />
    </div>
  );
};

export default Notifications;
