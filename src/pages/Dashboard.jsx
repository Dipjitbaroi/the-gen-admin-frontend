import React, { useEffect, useRef, useState } from "react";
import { format } from "date-fns"; // Import date formatting utility
import NewUsersTable from "../components/features/dashboard/NewUserTable.jsx";
import RecentTransactions from "../components/features/dashboard/RecentTransactions.jsx";
import Chart from "chart.js/auto"; // Ensure this import is included
import LineChart from "../components/features/charts/LineChart.jsx";
import {
  useGetNewUsersQuery,
  useGetNumOfUsersQuery,
  useGetTransactionsQuery,
} from "../services/apiConfig.js";
import { toast, ToastContainer } from "react-toastify";
import Loader from "../components/layout/Loader/Loader.jsx";
import currencyConfig from '../assets/currencies/currencies.json'; // Import your JSON file

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
    month: (new Date().getMonth() + 1).toString(),
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

  useEffect(() => {
    if (chartError) {
      toast.error("Error fetching number of users data");
    }
    if (newUserError) {
      toast.error("Error fetching new users data");
    }
    if (transactionError) {
      toast.error("Error fetching transactions data");
    }
  }, [chartError, newUserError, transactionError]);

  let chartData = { labels: [], datasets: [] };
  let newUsersData = [];

  if (chartLoading || newUserLoading || transactionLoading) {
    return <Loader />
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
        borderColor: "#8734A3",
        pointBackgroundColor: "#8734A3",
        tension: 0.15,
      },
    ],
  };

  // Format new users data with date conversion
  newUsersData = apiNewUserData
    ? apiNewUserData.data.map((user) => ({
        name: `${user.first_name} ${user.last_name}`,
        type: user.type,
        date: user.date
          ? format(new Date(user.date), "dd/MM/yyyy hh:mm a")
          : null, // Show null if date is missing
      }))
    : [];

  const transformTransactionData = (apiResponse) => {
    if (!apiResponse || !apiResponse.data) return []; // Safe check to prevent errors

    // Assuming you are using USD for now
    const currency = currencyConfig.currencies["MAIN"]; 

    return apiResponse.data.map((transaction) => ({
      _id: transaction._id,
      user: transaction.user_details?.first_name
        ? `${transaction.user_details.first_name} ${
            transaction.user_details.last_name || ""
          }`.trim()
        : "Unknown",
      amount: `${currency.symbol}${transaction.amount.toFixed(currency.decimal_places)}`,
    }));
  };

  return (
    <div className="">
      {/* Page Header */}
      <h1 className="text-4xl font-bold text-gray-800 h-12 mb-6">Dashboard</h1>

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
      <ToastContainer />
    </div>
  );
};

export default Dashboard;
