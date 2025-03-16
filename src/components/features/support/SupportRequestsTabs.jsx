import { useState, useEffect, useCallback } from "react";
import GeneralTable from "../../layout/Table/GeneralTable";
import PaginationLayout from "../../layout/Pagination/pagination";
import { useGetSupportsQuery } from "../../../services/apiConfig";
import debounce from "lodash/debounce";
import FilterSearchBar from "../../layout/Searchbar/SearchBarWithFilter";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../layout/Loader/Loader";

const SupportRequestsTabs = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(""); // New state for search input value
  const limit = 10; // Number of items per page

  let status = "";
  switch (activeTab) {
    case "Open":
      status = "open";
      break;
    case "Closed":
      status = "closed";
      break;
    default:
      status = "";
  }

  const { data, error, isLoading } = useGetSupportsQuery({
    page,
    limit,
    status,
    search: searchQuery, // Include search query in the API request
  });

  useEffect(() => {
    if (error) {
      const errorMessage =
        error.data?.message ||
        "Failed to fetch support requests. Please try again later.";
      toast.error(errorMessage);
    }
  }, [error]);

  // Ensure data is safely handled
  const resData = data?.data || [];
  const totalPages = data?.pagination?.totalPages || 1; // Ensure totalPages exists
  const totalItems = data?.pagination?.total || 0; // Ensure totalItems exists

  const columns = [
    { id: "_id", label: "Report ID" },
    { id: "type", label: "Report Type" },
    { id: "reported_by", label: "Reported By" },
    { id: "status", label: "Status" },
    { id: "reported_at", label: "Reported On" },
  ];

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

  if (isLoading) return <Loader />;

  return (
    <div>
      <div className="flex justify-between items-center h-12 mb-6">
        <h1 className="text-4xl font-bold text-gray-800">Support Requests</h1>
        <FilterSearchBar onSearchChange={handleSearchChange} />
      </div>
      <div className="bg-white rounded-lg border border-gray-300">
        <div className="flex border-b border-gray-300 w-full">
          {["All", "Open", "Closed"].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setPage(1); // Reset to first page when switching tabs
              }}
              className={`flex px-6 py-4 text-sm font-medium w-full justify-center h-full ${
                activeTab === tab
                  ? "border-b-2 border-[#8734A3] text-[#8734A3]"
                  : "text-gray-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <GeneralTable columns={columns} data={resData} />
      </div>
      <PaginationLayout
        totalPages={totalPages}
        page={page}
        onChangePage={handleChangePage}
        totalItems={totalItems}
        itemsPerPage={limit}
        type={"reports"}
      />
      <ToastContainer />
    </div>
  );
};

export default SupportRequestsTabs;
