import React from "react";
import { Line } from "react-chartjs-2";

const UsersTab = () => {
  const chartData = {
    labels: ["2/1", "2/5", "2/10", "2/15", "2/20", "2/25", "2/28"],
    datasets: [
      {
        label: "Active Users",
        data: [1000, 3000, 5000, 7000, 10000, 15000, 20000],
        borderColor: "#6366F1",
        pointBackgroundColor: "#6366F1",
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="p-6 shadow-md rounded-lg border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Active Users Over Time
      </h2>
      <Line data={chartData} options={{ responsive: true }} />
    </div>
  );
};

export default UsersTab;
