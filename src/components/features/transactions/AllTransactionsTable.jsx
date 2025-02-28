import { useState } from "react";
import GeneralTable from "../../layout/Table/GeneralTable";
import { useGetTransactionsQuery } from "../../../services/apiConfig";
import PaginationLayout from "../../layout/Pagination/pagination";

const AllTransactions = () => {
  const [page, setPage] = useState(1);
  const limit = 10; // Number of items per page

  const { data, error, isLoading } = useGetTransactionsQuery({ page, limit });

  console.log("Fetched Data:", data);
  console.log("Error:", error);

  // Ensure data is safely handled
  const resData = data?.data || [];
  const totalPages = data?.pagination?.totalPages || 1; // Ensure totalPages exists
  const totalItems = data?.pagination?.total || 0; // Ensure totalItems exists

  const columns = [
    { id: "_id", label: "Transaction ID" },
    { id: "type", label: "Type" },
    { id: "user", label: "User" },
    { id: "completed_at", label: "Date & Time" },
    { id: "amount", label: "Amount" },
    { id: "method", label: "Method" },
  ];

  if (isLoading) return <p>Loading transactions...</p>;
  if (error) return <p>Error fetching transactions</p>;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <div>
      <GeneralTable columns={columns} data={resData} />
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

export default AllTransactions;
