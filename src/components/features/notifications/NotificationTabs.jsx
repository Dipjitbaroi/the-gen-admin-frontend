import { useState } from "react";

import AllNotificationTable from "./NotificationTable";

const NotificationTabs = () => {
  const [activeTab, setActiveTab] = useState("All");

  const renderActiveTab = () => {
    switch (activeTab) {
      case "All":
        return <AllNotificationTable />;
      case "In-App":
        return;
      case "Push":
        return;
      default:
        return <AllNotificationTable />;
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-300">
      {/* Tabs */}
      <div className="flex border-b border-gray-300 w-full ">
        {["All", "In-App", "Push"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex px-6 py-4 text-sm font-medium w-full justify-center h-full ${
              activeTab === tab
                ? " border-b-2 border-[#8734A3] text-[#8734A3]"
                : "text-gray-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Active Tab Content */}
      {renderActiveTab()}
      
    </div>
  );
};

export default NotificationTabs;
