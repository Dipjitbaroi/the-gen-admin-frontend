import React, { useState } from "react";
import AllTransactionsTable from "./AllTransactionsTable";
import SubscriptionTransactionsTable from "./SubscriptionTransactionsTable";
import SessionTransactionsTable from "./SessionTransactionsTable";
import PayoutTransactionsTable from "./PayoutTransactionsTable";

const TransactionTabs = () => {
  const [activeTab, setActiveTab] = useState("All");

  const renderActiveTab = () => {
    switch (activeTab) {
      case "All":
        return <AllTransactionsTable />;
      case "Subscription":
        return <SubscriptionTransactionsTable />;
      case "Session":
        return <SessionTransactionsTable />;
      case "Payout":
        return <PayoutTransactionsTable />;
      default:
        return <AllTransactionsTable />;
    }
  };

  return (
    <div>
      {/* Tabs */}
      <div className="flex border-b border-gray-300 mb-4">
        {["All", "Subscription", "Session", "Payout"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 text-sm font-medium ${
              activeTab === tab
                ? "border-b-2 border-purple-600 text-purple-600"
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

export default TransactionTabs;
