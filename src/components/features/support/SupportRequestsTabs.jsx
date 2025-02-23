import { useState } from "react";
import GeneralTable from "../../layout/Table/GeneralTable";
import PaginationLayout from "../../layout/Pagination/pagination";
import { useGetSupportsQuery } from "../../../services/apiConfig";

const SupportRequestsTabs = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [page, setPage] = useState(1);
  const limit = 10; // Number of items per page

  let status = "";
  switch (activeTab) {
    case "Open":
      status = "admin";
      break;
    case "Closed":
      status = "admin";
      break;
    default:
      status = "";
  }

  const { data, error, isLoading } = useGetSupportsQuery({
    page,
    limit,
    status,
  });

  console.log("Fetched Data:", data);
  console.log("Error:", error);

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

  if (isLoading) return <p>Loading transactions...</p>;
  if (error) return <p>Error fetching transactions</p>;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  return (
    <div>
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
                  ? "border-b-2 border-purple-600 text-purple-600"
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
      />
    </div>
  );
};

export default SupportRequestsTabs;
