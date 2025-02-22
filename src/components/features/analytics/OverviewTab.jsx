import React from "react";
import { Line } from "react-chartjs-2";

const OverviewTab = () => {
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
        data: [50000, 100000, 200000, 300000, 400000, 600000, 786274],
        borderColor: "#A855F7",
        pointBackgroundColor: "#A855F7",
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="lg:col-span-2">
        <div className="p-6 shadow-md rounded-lg border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Number of Users
          </h2>
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>
      {/* Additional Smaller Charts */}
      {[
        "Real Time Mixer Users",
        "Real Time Active Users",
        "Sessions Booked",
        "Revenue",
      ].map((title, index) => (
        <div
          key={index}
          className="p-6 shadow-md rounded-lg border border-gray-200"
        >
          <h2 className="text-lg font-semibold text-gray-800 mb-4">{title}</h2>
          <Line data={chartData} options={chartOptions} />
        </div>
      ))}
    </div>
  );
};

export default OverviewTab;
