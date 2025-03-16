import { useState, useEffect } from "react";
import LineChart from "../charts/LineChart";
import {
  useGetProSubEarningsQuery,
  useGetRevenueQuery,
  useGetUnlimitedSubEarningsQuery,
} from "../../../services/apiConfig";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../layout/Loader/Loader";

const RevenueTab = () => {
  let revenueValue;
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

  const revenueApiParams = createApiParams(revenueValue);
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

  useEffect(() => {
    if (numOfUsersError) {
      const errorMessage =
        numOfUsersError.data?.message ||
        "Failed to fetch revenue data. Please try again later.";
      toast.error(errorMessage);
    }
    if (realTimeMixerUsersError) {
      const errorMessage =
        realTimeMixerUsersError.data?.message ||
        "Failed to fetch unlimited sub. earnings data. Please try again later.";
      toast.error(errorMessage);
    }
    if (realTimeActiveUsersError) {
      const errorMessage =
        realTimeActiveUsersError.data?.message ||
        "Failed to fetch pro sub. earnings data. Please try again later.";
      toast.error(errorMessage);
    }
  }, [numOfUsersError, realTimeMixerUsersError, realTimeActiveUsersError]);

  const handleChange = (setValue) => (event) => {
    setValue(event.target.value);
  };

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

  if (
    numOfUsersLoading ||
    realTimeMixerUsersLoading ||
    realTimeActiveUsersLoading
  ) {
    return <Loader />;
  }

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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="lg:col-span-2 ">
        {/* Adjusted height */}
        <LineChart
          title="Revenue This Month"
          chartData={transformRevenueData(RevenueData)}
          chartOptions={chartOptions}
          value={revenueValue}
          handleChange={""}
          className={"h-fit"}
          chartClass={"h-[200px]"}
          hideDropDown={true}
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
      <ToastContainer />
    </div>
  );
};

export default RevenueTab;
