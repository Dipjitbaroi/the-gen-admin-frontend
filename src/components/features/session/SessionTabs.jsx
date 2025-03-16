import { useState, useEffect, useCallback } from "react";
import { useGetSessionsQuery } from "../../../services/apiConfig";
import PaginationLayout from "../../layout/Pagination/pagination";
import GeneralTable from "../../layout/Table/GeneralTable";
import FilterAndAddColSearchBar from "../../layout/Searchbar/SearchbarWithFilter&AddCol";
import debounce from "lodash/debounce";
import { toast, ToastContainer } from "react-toastify";
import Loader from "../../layout/Loader/Loader";

const SessionTabs = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(""); // New state for search input value
  const limit = 10; // Number of items per page

  let type = "";
  switch (activeTab) {
    case "Upcoming":
      type = "upcoming";
      break;
    case "Completed":
      type = "completed";
      break;
    default:
      type = "";
  }

  const { data, error, isLoading } = useGetSessionsQuery({
    page,
    limit,
    type,
    search: searchQuery, // Include search query in the API request
  });

  useEffect(() => {
    if (error) {
      toast.error("Error fetching transactions");
    }
  }, [error]);

  // Ensure data is safely handled
  const resData = data?.data || [];
  const totalPages = data?.pagination?.totalPages || 1; // Ensure totalPages exists
  const totalItems = data?.pagination?.total || 0; // Ensure totalItems exists

  // Define table columns
  const columns = [
    { id: "date", label: "Date" },
    { id: "time", label: "Time" },
    { id: "sessionWith", label: "Session With" },
    { id: "duration", label: "Duration" },
    { id: "status", label: "Status" },
    { id: "bookedBy", label: "Booked By" },
  ];

  // Format data to ensure missing values are displayed as "null"
  const formattedData = resData.map((item) => ({
    _id: item.sessionId ?? "null",
    date: item.date ?? "null",
    time: item.time ?? "null",
    sessionWith: item.sessionWith ?? "null",
    duration: item.duration ?? "null",
    status: item.status ?? "null",
    bookedBy: item.bookedBy ?? "null",
  }));

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const debouncedSearch = useCallback(
    debounce((value) => {
      setSearchQuery(value);
      setPage(1); // Reset to first page when changing search query
    }, 300),
    []
  );

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const handleSearchChange = (event) => {
    debouncedSearch(event.target.value); // Use debounced function
  };

  if (isLoading) return <Loader/>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6 h-12">
        <h1 className="text-4xl font-bold text-gray-800">Sessions</h1>
        <div className="h-full">
          <FilterAndAddColSearchBar onSearchChange={handleSearchChange} />
        </div>
      </div>
      <div className="bg-white rounded-lg border border-gray-300">
        {/* Tabs */}
        <div className="flex border-b border-gray-300 w-full">
          {["All", "Upcoming", "Completed"].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setPage(1); // Reset to first page when switching tabs
              }}
              className={`flex px-6 py-4 text-sm font-medium w-full justify-center h-full${
                activeTab === tab
                  ? " border-b-2 border-[#8734A3] text-[#8734A3]"
                  : " text-gray-600"
              }`}
            >
              {tab} Sessions
            </button>
          ))}
        </div>

        {/* Table Content */}
        <GeneralTable
          columns={columns}
          data={formattedData}
          clickableRows={true}
          isNavigate={true}
          navLink={"/sessions/about"}
        />
      </div>
      {/* Pagination */}
      <PaginationLayout
        totalPages={totalPages}
        page={page}
        onChangePage={handleChangePage}
        totalItems={totalItems}
        itemsPerPage={limit}
        type={"sessions"}
      />
      <ToastContainer />
    </div>
  );
};

export default SessionTabs;
