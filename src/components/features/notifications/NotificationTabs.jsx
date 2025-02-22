import { useState } from "react";

import AllNotificationTable from "./NotificationTable";

const NotificationTabs = () => {
  const [activeTab, setActiveTab] = useState("All");

  const renderActiveTab = () => {
    switch (activeTab) {
      case "All":
        return <AllNotificationTable />;
      case "Subscription":
        return;
      case "Session":
        return;
      case "Payout":
        return;
      default:
        return;
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-300">
      {/* Tabs */}
      <div className="flex border-b border-gray-300 w-full ">
        {["All", "Subscription", "Session", "Payout"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex px-6 py-4 text-sm font-medium w-full justify-center h-full ${
              activeTab === tab
                ? " border-b-2 border-purple-600 text-purple-600"
                : "text-gray-600"
            }`}
          >
            {tab} Transactions
          </button>
        ))}
      </div>

      {/* Active Tab Content */}
      {renderActiveTab()}
      
    </div>
  );
};

export default NotificationTabs;
