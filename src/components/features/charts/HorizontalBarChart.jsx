import React from "react";
import { Bar } from "react-chartjs-2";
import DropdownComponent from "../../layout/Dropdown/dropdown";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const HorizontalBarChart = ({ value, handleChange, title, chartData}) => {

  const chartOptions = {
    indexAxis: "y",
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
        barPercentage: 1, // Set bar percentage to 1 for full size bars
      },
    },
    elements: {
      bar: {
        backgroundColor: "#EDEDFD", // light gray background color for bars
      },
    },
  };

  return (
    <div className="p-4 w-full shadow-md rounded-lg border border-gray-200 bg-white">
      <div className="flex justify-between border-b ">
        <h2 className="flex text-2xl font-semibold text-gray-800 items-center">{title}</h2>
        <DropdownComponent value={value} handleChange={handleChange} />
      </div>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default HorizontalBarChart;
