import { useState } from "react";
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
    <div className="bg-white rounded-lg border border-gray-300">
      {/* Tabs */}
      <div className="flex border-b border-gray-300 w-full">
        {["All", "Upcoming", "Completed"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex px-6 py-4 text-sm font-medium w-full justify-center h-full${
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
