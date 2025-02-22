import React, { useState } from "react";
import AllSessionsTable from "./AllSessionsTable";
import UpcomingSessionsTable from "./UpcomingSessions";
import CompletedSessionsTable from "./CompletedSessionsTable";

const SessionTabs = () => {
  const [activeTab, setActiveTab] = useState("All");

  const renderActiveTab = () => {
    switch (activeTab) {
      case "All":
        return <AllSessionsTable />;
      case "Upcoming":
        return <UpcomingSessionsTable />;
      case "Completed":
        return <CompletedSessionsTable />;
      default:
        return <AllSessionsTable />;
    }
  };

  return (
    <div>
      {/* Tabs */}
      <div className="flex border-b border-gray-300 mb-4">
        {["All", "Upcoming", "Completed"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 text-sm font-medium ${
              activeTab === tab
                ? "border-b-2 border-purple-600 text-purple-600"
                : "text-gray-600"
            }`}
          >
            {tab} Sessions
          </button>
        ))}
      </div>

      {/* Active Tab Content */}
      {renderActiveTab()}
    </div>
  );
};

export default SessionTabs;
