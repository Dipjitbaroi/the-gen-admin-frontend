import {useState} from "react";

import OverviewTab from "../components/features/analytics/OverviewTab.jsx"
import UsersTab from "../components/features/analytics/UsersTab.jsx";
import RevenueTab from "../components/features/analytics/RevenueTab.jsx";
import LeaderboardTab from "../components/features/analytics/LeaderboardTab.jsx";

const Analytics = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewTab />;
      case "users":
        return <UsersTab />;
      case "revenue":
        return <RevenueTab />;
      case "leaderboard":
        return <LeaderboardTab />;
      default:
        return <UsersTab />;
    }
  };

  return (
    <div className="">
      {/* Header */}
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Analytics</h1>

      {/* Tabs */}
      <div className="flex space-x-4 mb-8 border border-gray-200 bg-white rounded-lg w-full shadow-md">
        {["overview", "users", "revenue", "leaderboard"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex px-6 py-4 text-sm font-medium w-full justify-center h-full ${
              activeTab === tab
                ? "border-b-2 border-purple-600 text-purple-600 font-semibold"
                : "text-gray-600"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {renderTabContent()}
    </div>
  );
};

export default Analytics;
