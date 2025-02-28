import React, { useState } from "react";
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
  useGetNumOfUsersQuery,
  useGetRealTimeActiveUsersQuery,
  // useGetGeographicDataQuery,
} from "../../../services/apiConfig";

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

  const { data: apiChartData } = useGetNumOfUsersQuery(
    createApiParams(numOfUsersValue)
  );
  const { data: apiAgeData, error } = useGetAgeGroupQuery(
    createApiParams(ageGroupValue)
  );
  const { data: apiGenderData } = useGetGenderQuery(
    createApiParams(genderValue)
  );

  const handleChange = (setValue) => (event) => setValue(event.target.value);
  // Table pagination state
  const [page, setPage] = useState(1);
  const limit = 10;

  console.log(numOfUsersValue);
  console.log(ageGroupValue);
  console.log(genderValue);

  // API queries

  console.log(apiChartData);
  console.log(apiAgeData);
  console.log(error);
  console.log(apiGenderData);
  // const {
  //   data: geoData,
  //   totalPages,
  //   totalItems,
  // } = useGetGeographicDataQuery({ page, limit });

  const columns = [
    { id: "country", label: "Country" },
    { id: "language", label: "Language" },
    { id: "users", label: "Users" },
  ];

  const rows = [
    {
      country: "001",
      language: "Subscription",
      users: "xdy",
    },
    {
      country: "001",
      language: "Subscription",
      users: "xdy",
    },
    {
      country: "001",
      language: "Subscription",
      users: "xdy",
    },
  ];

  const geoData = rows;

  // Common dropdown handler
  const handleChangePage = (newPage) => setPage(newPage);

  const transformedAgeData = apiAgeData?.data
    ? {
        labels: apiAgeData.data.ageGroups.map((group) =>
          group._id.length === 0 ? "Unknown" : `${group._id[0]}-${group._id[1]}`
        ),
        datasets: [
          {
            label: "Current Month",
            data: apiAgeData.data.ageGroups.map((group) => group.count),
            backgroundColor: "#A855F7",
            borderColor: "#A855F7",
            borderWidth: 1,
            borderRadius: 10,
            barPercentage: 0.9,
          },
        ],
      }
    : { labels: [], datasets: [] }; // Default empty chart data

  const transformedGenderData = apiGenderData?.data
    ? {
        labels: apiGenderData.data.genders.map((gender) =>
          gender._id === null ? "Unknown" : gender._id
        ),
        datasets: [
          {
            label: "Current Month",
            data: apiGenderData.data.genders.map((gender) => gender.count),
            backgroundColor: "#A855F7",
            borderColor: "#A855F7",
            borderWidth: 1,
            borderRadius: 10,
            barPercentage: 0.9, // adjust the bar size within the available space
          },
        ],
      }
    : { labels: [], datasets: [] }; // Default empty chart data

  const numberOfUsers = apiChartData ? apiChartData.data.numberOfUsers : {};

  const labels = Object.keys(numberOfUsers).map((date) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "numeric",
      day: "numeric",
    })
  );
  const userData = Object.values(numberOfUsers);

  const chartData = {
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

  // const chartData = {
  //   labels: ["2/1", "2/5", "2/10", "2/15", "2/20", "2/25", "2/28"],
  //   datasets: [
  //     {
  //       label: "Users",
  //       data: [50000, 100000, 200000, 300000, 400000, 600000, 786274],
  //       borderColor: "#A855F7",
  //       pointBackgroundColor: "#A855F7",
  //       tension: 0,
  //     },
  //   ],
  // };

  // const barchartData = {
  //   labels: ["null", "male", "female", "trans", "non-binary"],
  //   datasets: [
  //     {
  //       label: "Current Month",
  //       data: [40, 80, 100, 60, 110],
  //       backgroundColor: "#A855F7",
  //       borderColor: "#A855F7",
  //       borderWidth: 1,
  //       borderRadius: 10,
  //       barPercentage: 0.9, // adjust the bar size within the available space
  //     },
  //   ],
  // };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="lg:col-span-2">
        <LineChart
          title="Active Users Over Time"
          chartData={chartData} // Process API data here
          chartOptions={chartOptions}
          value={numOfUsersValue}
          handleChange={handleChange(setNumOfUsersValue)}
        />
      </div>
      <div className="col-span-1">
        <HorizontalBarChart
          title="Age Group"
          chartData={transformedAgeData} // Process API data here
          value={ageGroupValue}
          handleChange={handleChange(setAgeGroupValue)}
        />
      </div>
      <div className="col-span-1">
        <HorizontalBarChart
          title="Gender"
          chartData={transformedGenderData} // Process API data here
          value={genderValue}
          handleChange={handleChange(setGenderValue)}
        />
      </div>
      {/* <div className="col-span-2">
        <TableContainer
          component={Paper}
          className="bg-white border rounded-md shadow p-4"
        >
          <h1 className="text-2xl font-semibold border-b pb-4">
            Geographic Locations
          </h1>
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
                    <TableCell key={col.id}>{row[col.id]}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-4">
            <PaginationLayout
              totalPages={totalPages}
              page={page}
              onChangePage={handleChangePage}
              totalItems={totalItems}
              itemsPerPage={limit}
            />
          </div>
        </TableContainer>
      </div> */}
    </div>
  );
};

export default UsersTab;
