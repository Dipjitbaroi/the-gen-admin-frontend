import React, { useState, useEffect } from "react";
import HorizontalBarChart from "../charts/HorizontalBarChart";
import LineChart from "../charts/LineChart";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import PaginationLayout from "../../layout/Pagination/pagination";
import {
  useGetAgeGroupQuery,
  useGetGenderQuery,
  useGetGeoDataQuery,
  useGetNumOfUsersQuery,
} from "../../../services/apiConfig";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../layout/Loader/Loader";

const UsersTab = () => {
  // Dropdown states
  const [numOfUsersValue, setNumOfUsersValue] = useState("thisMonth");
  const [ageGroupValue, setAgeGroupValue] = useState("thisMonth");
  const [genderValue, setGenderValue] = useState("thisMonth");

  const createApiParams = (value) => {
    if (value === "thisMonth") {
      return {
        type: "month",
        year: new Date().getFullYear().toString(),
        month: (new Date().getMonth() + 1).toString(),
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

  const {
    data: apiChartData,
    isLoading: isChartLoading,
    error: chartError,
  } = useGetNumOfUsersQuery(createApiParams(numOfUsersValue));
  const {
    data: apiAgeData,
    isLoading: isAgeLoading,
    error: ageError,
  } = useGetAgeGroupQuery(createApiParams(ageGroupValue));
  const {
    data: apiGenderData,
    isLoading: isGenderLoading,
    error: genderError,
  } = useGetGenderQuery(createApiParams(genderValue));

  const handleChange = (setValue) => (event) => setValue(event.target.value);
  // Table pagination state
  const [page, setPage] = useState(1);
  const limit = 10;

  const {
    data: geoData,
    error: geoError,
    isLoading: isGeoLoading,
  } = useGetGeoDataQuery({ page, limit });

  useEffect(() => {
    if (chartError) {
      const errorMessage =
        chartError.data?.message ||
        "Failed to fetch user data. Please try again later.";
      toast.error(errorMessage);
    }
    if (ageError) {
      const errorMessage =
        ageError.data?.message ||
        "Failed to fetch age data. Please try again later.";
      toast.error(errorMessage);
    }
    if (genderError) {
      const errorMessage =
        genderError.data?.message ||
        "Failed to fetch gender data. Please try again later.";
      toast.error(errorMessage);
    }
    if (geoError) {
      const errorMessage =
        geoError.data?.message ||
        "Failed to fetch location data. Please try again later.";
      toast.error(errorMessage);
    }
  }, [chartError, ageError, genderError, geoError]);

  const columns = [
    { id: "location", label: "Country" },
    { id: "language", label: "Language" },
    { id: "count", label: "Users" },
  ];

  const handleChangePage = (newPage) => setPage(newPage);

  // Transform Age Data for Charts
  const transformedAgeData = apiAgeData?.data
    ? {
        labels: apiAgeData.data.ageGroups.map((group) =>
          group._id.length === 0 ? "Unknown" : `${group._id[0]}-${group._id[1]}`
        ),
        datasets: [
          {
            label: "Current Month",
            data: apiAgeData.data.ageGroups.map((group) => group.count ?? 0),
            backgroundColor: "#8734A3",
            borderColor: "#8734A3",
            borderWidth: 1,
            borderRadius: 10,
            barPercentage: 0.9,
          },
        ],
      }
    : { labels: [], datasets: [] };

  // Transform Gender Data for Charts
  const transformedGenderData = apiGenderData?.data
    ? {
        labels: apiGenderData.data.genders.map((gender) =>
          gender._id === null ? "Unknown" : gender._id
        ),
        datasets: [
          {
            label: "Current Month",
            data: apiGenderData.data.genders.map((gender) => gender.count ?? 0),
            backgroundColor: "#8734A3",
            borderColor: "#8734A3",
            borderWidth: 1,
            borderRadius: 10,
            barPercentage: 0.9,
          },
        ],
      }
    : { labels: [], datasets: [] };

  // Transform Users Chart Data
  const numberOfUsers = apiChartData?.data?.numberOfUsers || {};
  const labels = Object.keys(numberOfUsers).map((date) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "numeric",
      day: "numeric",
    })
  );
  const userData = Object.values(numberOfUsers).map((val) => val ?? 0);

  const chartData = {
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

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="lg:col-span-2">
          {isChartLoading ? (
            <Loader />
          ) : chartError ? (
            <p>Error loading user data</p>
          ) : (
            <LineChart
              title="Active Users Over Time"
              chartData={chartData}
              chartOptions={chartOptions}
              value={numOfUsersValue}
              handleChange={handleChange(setNumOfUsersValue)}
            />
          )}
        </div>

        <div className="col-span-1">
          {isAgeLoading ? (
            <Loader />
          ) : ageError ? (
            <p>Error loading age data</p>
          ) : (
            <HorizontalBarChart
              title="Age Group"
              chartData={transformedAgeData}
              value={ageGroupValue}
              handleChange={handleChange(setAgeGroupValue)}
            />
          )}
        </div>

        <div className="col-span-1">
          {isGenderLoading ? (
            <Loader />
          ) : genderError ? (
            <p>Error loading gender data</p>
          ) : (
            <HorizontalBarChart
              title="Gender"
              chartData={transformedGenderData}
              value={genderValue}
              handleChange={handleChange(setGenderValue)}
            />
          )}
        </div>

        <div className="col-span-2">
          <TableContainer
            component={Paper}
            className="bg-white border rounded-md shadow p-4"
          >
            <h1 className="text-2xl font-semibold border-b pb-4">
              Geographic Locations
            </h1>

            {isGeoLoading ? (
              <Loader />
            ) : geoError ? (
              <p>Error loading location data</p>
            ) : (
              <>
                <Table>
                  <TableHead>
                    <TableRow>
                      {columns.map((col) => (
                        <TableCell key={col.id} className="font-semibold">
                          {col.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {geoData?.data.map((row, index) => (
                      <TableRow key={index}>
                        {columns.map((col) => (
                          <TableCell key={col.id}>
                            {row[col.id] ?? "null"}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="mt-4">
                  <PaginationLayout
                    totalPages={geoData?.pagination?.totalPages || 1}
                    page={page}
                    onChangePage={handleChangePage}
                    totalItems={geoData?.pagination?.total || 0}
                    itemsPerPage={limit}
                    type={"locations"}
                  />
                </div>
              </>
            )}
          </TableContainer>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default UsersTab;
