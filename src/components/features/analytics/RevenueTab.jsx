import React, { useState } from "react";
import LineChart from "../charts/LineChart";
import {
  useGetProSubEarningsQuery,
  useGetRevenueQuery,
  useGetUnlimitedSubEarningsQuery,
} from "../../../services/apiConfig";

const RevenueTab = () => {
  const [revenueValue, setrevenueValue] = useState("thisMonth");
  const [unlimitedSubEarningsValue, setunlimitedSubEarningsValue] =
    useState("thisMonth");
  const [proSubEarningsValue, setproSubEarningsValue] = useState("thisMonth");

  const createApiParams = (value) => {
    if (value === "thisMonth") {
      return {
        type: "month",
        year: new Date().getFullYear().toString(),
        month: (new Date().getMonth() + 1).toString(), // January is 0
      };
    } else {
      const monthIndex = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ].indexOf(value);
      return {
        type: "month",
        year: new Date().getFullYear().toString(),
        month: (monthIndex + 1).toString(),
      };
    }
  };

  const revenueApiParams = createApiParams(
    revenueValue
  );
  const unlimitedSubEarningsApiParams = createApiParams(
    unlimitedSubEarningsValue
  );
  const proSubEarningsApiParams = createApiParams(proSubEarningsValue);

  const {
    data: RevenueData,
    error: numOfUsersError,
    isLoading: numOfUsersLoading,
  } = useGetRevenueQuery(revenueApiParams);
  const {
    data: UnlimitedSubEarningsData,
    error: realTimeMixerUsersError,
    isLoading: realTimeMixerUsersLoading,
  } = useGetUnlimitedSubEarningsQuery(unlimitedSubEarningsApiParams);
  const {
    data: ProSubEarningsData,
    error: realTimeActiveUsersError,
    isLoading: realTimeActiveUsersLoading,
  } = useGetProSubEarningsQuery(proSubEarningsApiParams);

  const handleChange = (setValue) => (event) => {
    setValue(event.target.value);
  };

  // const chartDynamicData = (labels, data) => {
  //   const dataSet = {
  //     labels: labels,
  //     datasets: [
  //       {
  //         label: "Users",
  //         data: data,
  //         borderColor: "#A855F7",
  //         pointBackgroundColor: "#A855F7",
  //         tension: 0,
  //       },
  //     ],
  //   };
  //   return dataSet;
  // };

  const transformRevenueData = (apiData) => {
    const dayWiseRevenue = apiData.dayWiseRevenue;

    // Extract labels (dates in MM/DD format) and revenue data
    const labels = dayWiseRevenue.map((entry) => {
      const date = new Date(entry.date);
      return `${date.getMonth() + 1}/${date.getDate()}`; // Convert to MM/DD format
    });

    const data = dayWiseRevenue.map((entry) => entry.revenue);

    return {
      labels,
      datasets: [
        {
          label: "Revenue",
          data,
          borderColor: "#A855F7",
          pointBackgroundColor: "#A855F7",
          tension: 0.4,
        },
      ],
    };
  };

  if (
    numOfUsersLoading ||
    realTimeMixerUsersLoading ||
    realTimeActiveUsersLoading 
  ) {
    return <p>Loading...</p>;
  }

  if (
    numOfUsersError ||
    realTimeMixerUsersError ||
    realTimeActiveUsersError
  ) {
    return <p>Error: Unable to fetch data</p>;
  }

  // const chartData = {
  //   labels: ["2/1", "2/5", "2/10", "2/15", "2/20", "2/25", "2/28"],
  //   datasets: [
  //     {
  //       label: "Active Users",
  //       data: [1000, 3000, 5000, 7000, 10000, 15000, 20000],
  //       borderColor: "#A855F7",
  //       pointBackgroundColor: "#A855F7",
  //       tension: 0.4,
  //     },
  //   ],
  // };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: { grid: { display: "#E5E7EB" } },
      y: {
        grid: { color: "#E5E7EB" },
      },
    },
    maintainAspectRatio: false, // Ensure the chart maintains aspect ratio
  };

  // const value = "thisMonth"; // Example value
  // const handleChange = (event) => {
  //   console.log(event.target.value);
  // }; // Example handler function

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="lg:col-span-2 ">
        {/* Adjusted height */}
        <LineChart
          title="Revenue This Month"
          chartData={transformRevenueData(RevenueData)}
          chartOptions={chartOptions}
          value={revenueValue}
          handleChange={handleChange}
          className={"h-fit"}
          chartClass={"h-[200px]"}
          key={1}
        />
      </div>
      <LineChart
        title="Unlimited Sub. Earnings"
        chartData={transformRevenueData(UnlimitedSubEarningsData)}
        chartOptions={chartOptions}
        value={unlimitedSubEarningsValue}
        handleChange={handleChange(setunlimitedSubEarningsValue)}
        chartClass={"h-[200px]"}
      />
      <LineChart
        title="Pro Sub. Earnings"
        chartData={transformRevenueData(ProSubEarningsData)}
        chartOptions={chartOptions}
        value={proSubEarningsValue}
        handleChange={handleChange(setproSubEarningsValue)}
        chartClass={"h-[200px]"}
      />
    </div>
  );
};

export default RevenueTab;
