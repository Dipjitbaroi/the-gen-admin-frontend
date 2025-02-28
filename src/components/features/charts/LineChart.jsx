import React from "react";
import { Line } from "react-chartjs-2";
import Upward from "../../../assets/upward.png";
import Downward from "../../../assets/downward.png"; // Make sure to include the correct path
import DropdownComponent from "../../layout/Dropdown/dropdown";

const LineChart = ({
  chartData,
  chartOptions,
  value,
  handleChange,
  title,
  className,
  chartClass,
}) => {
  const dataPoints = chartData?.datasets?.[0]?.data || [];
  const lastDataPoint = dataPoints.slice(-1)[0] || 0;
  console.log(lastDataPoint)
  const secondLastDataPoint = dataPoints.slice(-2, -1)[0] || 0;
  const isUpwardTrend = lastDataPoint >= secondLastDataPoint;
  const formattedLastDataPoint = lastDataPoint.toLocaleString();
  const trendImage = isUpwardTrend ? Upward : Downward;

  return (
    <div
      className={`p-4 shadow-md bg-white rounded-lg border border-gray-200 ${className}`}
    >
      <h1 className="text-2xl font-semibold border-b text-gray-800 pb-2">
        {title}
      </h1>
      <div className="flex justify-between pb-1 m-0">
        <div className="flex items-center">
          <p className="text-4xl font-bold text-gray-800">
            {formattedLastDataPoint}
          </p>
          <img
            className="ml-4"
            src={trendImage}
            alt={isUpwardTrend ? "Upward" : "Downward"}
          />
        </div>
        <DropdownComponent value={value} handleChange={handleChange} />
      </div>
      <div className={`${chartClass}`}>
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default LineChart;
