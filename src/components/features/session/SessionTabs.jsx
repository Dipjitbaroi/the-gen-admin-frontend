import { useState } from "react";
import { useGetSessionsQuery } from "../../../services/apiConfig";
import PaginationLayout from "../../layout/Pagination/pagination";
import GeneralTable from "../../layout/Table/GeneralTable";

const SessionTabs = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [page, setPage] = useState(1);
  const limit = 10; // Number of items per page

  let type = "";
  switch (activeTab) {
    case "Upcoming":
      type = "subs";
      break;
    case "Completed":
      type = "session";
      break;
    default:
      type = "";
  }

  const { data, error, isLoading } = useGetSessionsQuery({
    page,
    limit,
    type,
  });

  console.log("Fetched Data:", data);
  console.log("Error:", error);

  // Ensure data is safely handled
  const resData = data?.data || [];
  const totalPages = data?.pagination?.totalPages || 1; // Ensure totalPages exists
  const totalItems = data?.pagination?.total || 0; // Ensure totalItems exists

  const columns = [
    { id: "date", label: "Date" },
    { id: "time", label: "Time" },
    { id: "sessionWith", label: "Session With" },
    { id: "duration", label: "Duration" },
    { id: "status", label: "Status" },
    { id: "bookedBy", label: "Booked By" },
  ];

  if (isLoading) return <p>Loading transactions...</p>;
  if (error) return <p>Error fetching transactions</p>;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <div>
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
                  ? "border-b-2 border-purple-600 text-purple-600"
                  : "text-gray-600"
              }`}
            >
              {tab} Sessions
            </button>
          ))}
        </div>

        {/* Active Tab Content */}
        {/* {renderActiveTab()} */}
        <GeneralTable columns={columns} data={resData} />
      </div>
      <PaginationLayout
        totalPages={totalPages}
        page={page}
        onChangePage={handleChangePage}
        totalItems={totalItems}
        itemsPerPage={limit}
      />
    </div>
  );
};

export default SessionTabs;
