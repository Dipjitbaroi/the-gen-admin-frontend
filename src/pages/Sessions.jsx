import React from "react";
import SessionTabs from "../components/features/session/SessionTabs.jsx";
import SearchBar from "../components/layout/Searchbar/Searchbar.jsx";

const Sessions = () => {
  return (
    <div className="">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-gray-800">Sessions</h1>
        <div className="">
          <SearchBar />
        </div>
      </div>

      {/* Tabs Section */}
      <SessionTabs />
    </div>
  );
};

export default Sessions;
