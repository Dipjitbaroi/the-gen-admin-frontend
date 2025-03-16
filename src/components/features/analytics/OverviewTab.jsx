import React, { useState, useEffect } from "react";
import LineChart from "../charts/LineChart";
import {
  useGetNumOfUsersQuery,
  useGetRealTimeActiveUsersQuery,
  useGetRealTimeMixerUsersQuery,
  useGetRevenueQuery,
  useGetSessionBookedQuery,
} from "../../../services/apiConfig";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../layout/Loader/Loader";

const OverviewTab = () => {
  const [numOfUsersValue, setNumOfUsersValue] = useState("thisMonth");
  const [realTimeMixerUsersValue, setRealTimeMixerUsersValue] =
    useState("thisMonth");
  const [realTimeActiveUsersValue, setRealTimeActiveUsersValue] =
    useState("thisMonth");
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
  const realTimeActiveUsersApiParams = createApiParams(
    realTimeActiveUsersValue
  );
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
      y: { grid: { color: "#E5E7EB" } },
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
  const {
    data: RevenueData,
    error: RevenueError,
    isLoading: RevenueLoading,
  } = useGetRevenueQuery(revenueApiParams);

  useEffect(() => {
    if (numOfUsersError) {
      const errorMessage =
        numOfUsersError.data?.message ||
        "Failed to fetch number of users data. Please try again later.";
      toast.error(errorMessage);
    }
    if (realTimeMixerUsersError) {
      const errorMessage =
        realTimeMixerUsersError.data?.message ||
        "Failed to fetch real-time mixer users data. Please try again later.";
      toast.error(errorMessage);
    }
    if (realTimeActiveUsersError) {
      const errorMessage =
        realTimeActiveUsersError.data?.message ||
        "Failed to fetch real-time active users data. Please try again later.";
      toast.error(errorMessage);
    }
    if (sessionBookedError) {
      const errorMessage =
        sessionBookedError.data?.message ||
        "Failed to fetch session booked data. Please try again later.";
      toast.error(errorMessage);
    }
    if (RevenueError) {
      const errorMessage =
        RevenueError.data?.message ||
        "Failed to fetch revenue data. Please try again later.";
      toast.error(errorMessage);
    }
  }, [
    numOfUsersError,
    realTimeMixerUsersError,
    realTimeActiveUsersError,
    sessionBookedError,
    RevenueError,
  ]);

  const chartDynamicData = (labels, data) => {
    const dataSet = {
      labels: labels,
      datasets: [
        {
          label: "Users",
          data: data,
          borderColor: "#8734A3",
          pointBackgroundColor: "#8734A3",
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
    sessionBookedLoading ||
    RevenueLoading
  ) {
    return <Loader />;
  }

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
          borderColor: "#8734A3",
          pointBackgroundColor: "#8734A3",
          tension: 0.15,
        },
      ],
    };
  };

  const numOfUsersChartData = formatData(numOfUsersData, "numberOfUsers");
  const realTimeMixerUsersChartData = formatData(
    realTimeMixerUsersData,
    "realtimeMixerUser"
  );
  const realTimeActiveUsersChartData = formatData(
    realTimeActiveUsersData,
    "realtimeActiveUser"
  );
  const sessionBookedChartData = formatData(
    sessionBookedData,
    "sessionsBooked"
  );

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="lg:col-span-2 ">
          <LineChart
            title="Number of Users"
            chartData={chartDynamicData(
              numOfUsersChartData.labels,
              numOfUsersChartData.data
            )}
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
          chartData={chartDynamicData(
            realTimeMixerUsersChartData.labels,
            realTimeMixerUsersChartData.data
          )}
          chartOptions={chartOptions}
          value={realTimeMixerUsersValue}
          handleChange={handleChange(setRealTimeMixerUsersValue)}
          chartClass={"h-[200px]"}
        />
        <LineChart
          title="Real Time Active Users"
          chartData={chartDynamicData(
            realTimeActiveUsersChartData.labels,
            realTimeActiveUsersChartData.data
          )}
          chartOptions={chartOptions}
          value={realTimeActiveUsersValue}
          handleChange={handleChange(setRealTimeActiveUsersValue)}
          chartClass={"h-[200px]"}
        />
        <LineChart
          title="Sessions Booked"
          chartData={chartDynamicData(
            sessionBookedChartData.labels,
            sessionBookedChartData.data
          )}
          chartOptions={chartOptions}
          value={sessionBookedValue}
          handleChange={handleChange(setSessionBookedValue)}
          chartClass={"h-[200px]"}
        />
        <LineChart
          title="Revenue"
          chartData={transformRevenueData(RevenueData)}
          chartOptions={chartOptions}
          value={revenueValue}
          handleChange={handleChange(setRevenueValue)}
          chartClass={"h-[200px]"}
        />
      </div>
      <ToastContainer />
    </>
  );
};

export default OverviewTab;
