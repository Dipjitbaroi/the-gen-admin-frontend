import React from "react";
import SessionTabs from "../components/features/session/SessionTabs.jsx";

const Sessions = () => {
    return (
        <div className="p-8">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Sessions</h1>
                <input
                    type="text"
                    placeholder="Search..."
                    className="border border-gray-300 rounded-lg p-2 text-sm"
                />
            </div>

            {/* Tabs Section */}
            <SessionTabs />
        </div>
    );
};

export default Sessions;
