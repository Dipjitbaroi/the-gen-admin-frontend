import React from "react";
import UserMetrics from "../components/features/dashboard/UserMetrics.jsx";
import NewUsersTable from "../components/features/dashboard/NewUserTable.jsx";
import RecentTransactions from "../components/features/dashboard/RecentTransactions.jsx";


const Dashboard = () => {
    return (
        <div className="p-8">
            {/* Page Header */}
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>

            {/* Top Section: User Metrics */}
            <div className="mb-8">
                <UserMetrics />
            </div>

            {/* Bottom Section: New Users Table & Recent Transactions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <NewUsersTable />
                <RecentTransactions />
            </div>
        </div>
    );
};

export default Dashboard;
