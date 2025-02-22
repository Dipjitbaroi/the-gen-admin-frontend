import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const Demographics = () => {
  const data = {
    labels: ["Male", "Female", "Others"],
    datasets: [
      {
        label: "Gender Distribution",
        data: [55, 40, 5],
        backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
      },
    ],
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Demographics</h2>
      <Pie data={data} />
    </div>
  );
};

export default Demographics;
