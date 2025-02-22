// import React from "react";
// import UserMetrics from "../components/features/dashboard/UserMetrics.jsx";
import NewUsersTable from "../components/features/dashboard/NewUserTable.jsx";
import RecentTransactions from "../components/features/dashboard/RecentTransactions.jsx";
import { useEffect, useRef } from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto"; // Ensure this import is included
import Upward from "../assets/upward.png";

const Dashboard = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    // Use chartInstance from ref properly
    const chart = chartRef.current;
    return () => {
      if (chart) {
        chart.destroy();
      }
    };
  }, []);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: { grid: { display: false } },
      y: { grid: { color: "#E5E7EB" } },
    },
  };

  const chartData = {
    labels: ["2/1", "2/5", "2/10", "2/15", "2/20", "2/25", "2/28"],
    datasets: [
      {
        label: "Users",
        data: [100000, 200000, 300000, 400000, 500000, 600000, 800000],
        borderColor: "#A855F7",
        pointBackgroundColor: "#A855F7",
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="p-8">
      {/* Page Header */}
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>

      {/* Top Section: User Metrics */}
      <div className="mb-8">
        {/* <UserMetrics /> */}
        <div className="lg:col-span-2">
          <div className="p-6 shadow-md rounded-lg border border-gray-200">
            <h2 className="text-lg font-semibold border-b-2 text-gray-800 pb-2">
              Number of Users
            </h2>
            <div className="flex justify-between">
              <div className="flex items-center">
                <p>786274</p>
                <img src={Upward} alt="Upward" />
              </div>
              <div>dropdown</div>
            </div>
            <Line ref={chartRef} data={chartData} options={chartOptions} />
          </div>
        </div>
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
