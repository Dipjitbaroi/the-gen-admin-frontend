import React, { useEffect, useRef, useState } from "react";
import NewUsersTable from "../components/features/dashboard/NewUserTable.jsx";
import RecentTransactions from "../components/features/dashboard/RecentTransactions.jsx";
import Chart from "chart.js/auto"; // Ensure this import is included
import LineChart from "../components/features/charts/LineChart.jsx";
import {
  useGetNewUsersQuery,
  useGetNumOfUsersQuery,
  useGetTransactionsQuery,
} from "../services/apiConfig.js";

const Dashboard = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = chartRef.current;
    return () => {
      if (chart) {
        chart.destroy();
      }
    };
  }, []);

  const [value, setValue] = useState("thisMonth");
  const [apiParams, setApiParams] = useState({
    type: "month",
    year: new Date().getFullYear().toString(),
    month: (new Date().getMonth() + 1).toString(), // January is 0
  });

  const handleChange = (event) => {
    setValue(event.target.value);

    if (event.target.value === "thisMonth") {
      setApiParams({
        type: "month",
        year: new Date().getFullYear().toString(),
        month: (new Date().getMonth() + 1).toString(),
      });
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
      ].indexOf(event.target.value);

      setApiParams({
        type: "month",
        year: new Date().getFullYear().toString(),
        month: (monthIndex + 1).toString(),
      });
    }
  };

  const newUsersCols = [
    { id: "name", label: "Name" },
    { id: "type", label: "Type" },
    { id: "date", label: "Joined On" },
  ];

  const transactionData = [
    { _id: "8czi2wxfe5czi3fssn", user: "Pro", amount: "£4.99" },
    { _id: "8czi2wxfe5czi3fssn", user: "Peer", amount: "£4.99" },
    { _id: "8czi2wxfe5czi3fssn", user: "Pro", amount: "£4.99" },
  ];

  const transactionCols = [
    { id: "_id", label: "Transaction ID" },
    { id: "user", label: "User" },
    { id: "amount", label: "Amount" },
  ];

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: { grid: { display: "#E5E7EB" } },
      y: {
        grid: { color: "#E5E7EB" },
        ticks: {
          stepSize: 200000, // Set the step size to 200k
        },
      },
    },
    maintainAspectRatio: false,
  };

  const {
    data: apiChartData,
    error: chartError,
    isLoading: chartLoading,
  } = useGetNumOfUsersQuery(apiParams);

  const {
    data: apiNewUserData,
    error: newUserError,
    isLoading: newUserLoading,
  } = useGetNewUsersQuery();

  const {
    data: apiTransactionData,
    error: transactionError,
    isLoading: transactionLoading,
  } = useGetTransactionsQuery({
    page: "1",
    limit: "10",
    sort: "asc",
  });

  let chartData = { labels: [], datasets: [] };
  let newUsersData = [];

  if (chartLoading || newUserLoading) {
    return <p>Loading...</p>;
  }

  if (chartError || newUserError) {
    console.log(chartError || newUserError);
    return <p>Error: Unable to fetch data</p>;
  }

  const numberOfUsers = apiChartData ? apiChartData.data.numberOfUsers : {};

  const labels = Object.keys(numberOfUsers).map((date) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "numeric",
      day: "numeric",
    })
  );
  const userData = Object.values(numberOfUsers);

  chartData = {
    labels,
    datasets: [
      {
        label: "Users",
        data: userData,
        borderColor: "#A855F7",
        pointBackgroundColor: "#A855F7",
        tension: 0,
      },
    ],
  };

  newUsersData = apiNewUserData
    ? apiNewUserData.data.map((user) => ({
        name: `${user.first_name} ${user.last_name}`,
        type: user.type,
        date: user.date,
      }))
    : [];

  const transformTransactionData = (apiResponse) => {
    return apiResponse.data.map((transaction) => ({
      _id: transaction._id,
      user: transaction.user_details?.first_name
        ? `${transaction.user_details.first_name} ${
            transaction.user_details.last_name || ""
          }`.trim()
        : "Unknown",
      amount: `£${transaction.amount.toFixed(2)}`,
    }));
  };

  return (
    <div className="">
      {/* Page Header */}
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="lg:col-span-2">
          <LineChart
            title={"Number Of Users"}
            chartData={chartData}
            chartOptions={chartOptions}
            value={value}
            handleChange={handleChange}
            className={"h-fit"}
            chartClass={"h-[200px]"}
          />
        </div>
        <NewUsersTable columns={newUsersCols} data={newUsersData} />
        <RecentTransactions
          columns={transactionCols}
          data={transformTransactionData(apiTransactionData)}
        />
      </div>
    </div>
  );
};

export default Dashboard;
