import React, { useState } from "react";
import LineChart from "../charts/LineChart";
import {
  useGetNumOfUsersQuery,
  useGetRealTimeActiveUsersQuery,
  useGetRealTimeMixerUsersQuery,
  useGetSessionBookedQuery,
} from "../../../services/apiConfig";

const OverviewTab = () => {
  const [numOfUsersValue, setNumOfUsersValue] = useState("thisMonth");
  const [realTimeMixerUsersValue, setRealTimeMixerUsersValue] = useState("thisMonth");
  const [realTimeActiveUsersValue, setRealTimeActiveUsersValue] = useState("thisMonth");
  const [sessionBookedValue, setSessionBookedValue] = useState("thisMonth");
  const [revenueValue, setRevenueValue] = useState("thisMonth");

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

  const numOfUsersApiParams = createApiParams(numOfUsersValue);
  const realTimeMixerUsersApiParams = createApiParams(realTimeMixerUsersValue);
  const realTimeActiveUsersApiParams = createApiParams(realTimeActiveUsersValue);
  const sessionBookedApiParams = createApiParams(sessionBookedValue);
  const revenueApiParams = createApiParams(revenueValue);

  const handleChange = (setValue) => (event) => {
    setValue(event.target.value);
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: { grid: { display: "#E5E7EB" } },
      y: { grid: { color: "#E5E7EB" }, ticks: { stepSize: 200000 } },
    },
    maintainAspectRatio: false,
  };

  const {
    data: numOfUsersData,
    error: numOfUsersError,
    isLoading: numOfUsersLoading,
  } = useGetNumOfUsersQuery(numOfUsersApiParams);
  const {
    data: realTimeMixerUsersData,
    error: realTimeMixerUsersError,
    isLoading: realTimeMixerUsersLoading,
  } = useGetRealTimeMixerUsersQuery(realTimeMixerUsersApiParams);
  const {
    data: realTimeActiveUsersData,
    error: realTimeActiveUsersError,
    isLoading: realTimeActiveUsersLoading,
  } = useGetRealTimeActiveUsersQuery(realTimeActiveUsersApiParams);
  const {
    data: sessionBookedData,
    error: sessionBookedError,
    isLoading: sessionBookedLoading,
  } = useGetSessionBookedQuery(sessionBookedApiParams);

  const chartData = {
    labels: ["2/1", "2/5", "2/10", "2/15", "2/20", "2/25", "2/28"],
    datasets: [
      {
        label: "Users",
        data: [50000, 100000, 200000, 300000, 400000, 600000, 786274],
        borderColor: "#A855F7",
        pointBackgroundColor: "#A855F7",
        tension: 0,
      },
    ],
  };

  const chartDynamicData = (labels, data) => {
    const dataSet = {
      labels: labels,
      datasets: [
        {
          label: "Users",
          data: data,
          borderColor: "#A855F7",
          pointBackgroundColor: "#A855F7",
          tension: 0,
        },
      ],
    };
    return dataSet;
  };

  const formatData = (apiData, field) => {
    if (!apiData || !apiData.data || !apiData.data[field]) {
      return { labels: [], data: [] };
    }

    const numberOfUsers = apiData.data[field];

    const labels = Object.keys(numberOfUsers).map((date) =>
      new Date(date).toLocaleDateString("en-US", {
        month: "numeric",
        day: "numeric",
      })
    );

    const userData = Object.values(numberOfUsers);

    return { labels, data: userData };
  };

  if (
    numOfUsersLoading ||
    realTimeMixerUsersLoading ||
    realTimeActiveUsersLoading ||
    sessionBookedLoading
  ) {
    return <p>Loading...</p>;
  }

  if (
    numOfUsersError ||
    realTimeMixerUsersError ||
    realTimeActiveUsersError ||
    sessionBookedError
  ) {
    return <p>Error: Unable to fetch data</p>;
  }

  const numOfUsersChartData = formatData(numOfUsersData, "numberOfUsers");
  const realTimeMixerUsersChartData = formatData(realTimeMixerUsersData, "realtimeMixerUser");
  const realTimeActiveUsersChartData = formatData(realTimeActiveUsersData, "realtimeActiveUser");
  const sessionBookedChartData = formatData(sessionBookedData, "sessionsBooked");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="lg:col-span-2 ">
        <LineChart
          title="Number of Users"
          chartData={chartDynamicData(numOfUsersChartData.labels, numOfUsersChartData.data)}
          chartOptions={chartOptions}
          value={numOfUsersValue}
          handleChange={handleChange(setNumOfUsersValue)}
          className={"h-fit"}
          chartClass={"h-[200px]"}
          key={1}
        />
      </div>
      <LineChart
        title="Real Time Mixer Users"
        chartData={chartDynamicData(realTimeMixerUsersChartData.labels, realTimeMixerUsersChartData.data)}
        chartOptions={chartOptions}
        value={realTimeMixerUsersValue}
        handleChange={handleChange(setRealTimeMixerUsersValue)}
        chartClass={"h-[200px]"}
      />
      <LineChart
        title="Real Time Active Users"
        chartData={chartDynamicData(realTimeActiveUsersChartData.labels, realTimeActiveUsersChartData.data)}
        chartOptions={chartOptions}
        value={realTimeActiveUsersValue}
        handleChange={handleChange(setRealTimeActiveUsersValue)}
        chartClass={"h-[200px]"}
      />
      <LineChart
        title="Sessions Booked"
        chartData={chartDynamicData(sessionBookedChartData.labels, sessionBookedChartData.data)}
        chartOptions={chartOptions}
        value={sessionBookedValue}
        handleChange={handleChange(setSessionBookedValue)}
        chartClass={"h-[200px]"}
      />
      <LineChart
        title="Revenue"
        chartData={chartData}
        chartOptions={chartOptions}
        value={revenueValue}
        handleChange={handleChange(setRevenueValue)}
        chartClass={"h-[200px]"}
      />
    </div>
  );
};

export default OverviewTab;
