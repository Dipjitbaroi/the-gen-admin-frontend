import { useState, useEffect, useCallback } from "react";
import { format } from "date-fns"; // Import date formatting utility
import GeneralTable from "../../layout/Table/GeneralTable";
import PaginationLayout from "../../layout/Pagination/pagination";
import { useGetTransactionsQuery } from "../../../services/apiConfig";
import FilterAndAddColSearchBar from "../../layout/Searchbar/SearchbarWithFilter&AddCol";
import debounce from "lodash/debounce";
import { toast, ToastContainer } from "react-toastify";
import Loader from "../../layout/Loader/Loader";
import currencyConfig from '../../../assets/currencies/currencies.json'; // Import your JSON file

const TransactionTabs = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(""); // New state for search input value
  const limit = 10; // Number of items per page

  let type = "";
  switch (activeTab) {
    case "Subscription":
      type = "subs";
      break;
    case "Session":
      type = "session";
      break;
    case "Payout":
      type = "payout";
      break;
    default:
      type = "";
  }

  const { data, error, isLoading } = useGetTransactionsQuery({
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
  const rawData = data?.data || [];
  const totalPages = data?.pagination?.totalPages || 1;
  const totalItems = data?.pagination?.total || 0;

  // Function to return "null" if the value is missing
  const safeValue = (value) => (value ? value : "null");

  // Format transactions data
  const resData = rawData.map((transaction) => {
    const currency = currencyConfig.currencies["MAIN"]; // Assuming you are using USD for now

    return {
      _id: safeValue(transaction._id),
      type: safeValue(transaction.type),
      user: transaction.user_details
        ? `${safeValue(transaction.user_details.first_name)} ${safeValue(
            transaction.user_details.last_name
          )}`.trim()
        : "null", // Handle missing user data
      recipient:
        type === "payout"
          ? transaction.user_details
            ? `${safeValue(transaction.user_details.first_name)} ${safeValue(
                transaction.user_details.last_name
              )}`.trim()
            : "null"
          : transaction.recipient_details
          ? `${safeValue(transaction.recipient_details.first_name)} ${safeValue(
              transaction.recipient_details.last_name
            )}`.trim()
          : "null", // Handle missing user data
      completed_at: transaction.completed_at
        ? format(new Date(transaction.completed_at), "dd/MM/yyyy hh:mm a")
        : "null", // Show "NULL" if date is missing
      amount: `${currency.symbol}${safeValue(transaction.amount).toFixed(currency.decimal_places)}`, // Add currency symbol
      payment_method: safeValue(transaction.payment_method),
    };
  });

  const columns = [
    { id: "_id", label: "Transaction ID" },
    { id: "type", label: "Type" },
    {
      id:
        activeTab === "Session" || activeTab === "Payout"
          ? "recipient"
          : "user",
      label:
        activeTab === "Session" || activeTab === "Payout"
          ? "Recipient"
          : "User",
    },
    { id: "completed_at", label: "Date & Time" },
    { id: "amount", label: "Amount" },
    { id: "payment_method", label: "Method" },
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
      <div className="flex justify-between items-center mb-6 h-12">
        <h1 className="text-4xl font-bold text-gray-800">Transactions</h1>
        <FilterAndAddColSearchBar onSearchChange={handleSearchChange} />
      </div>
      <div className="bg-white rounded-lg border border-gray-300">
        <div className="flex border-b border-gray-300 w-full">
          {["All", "Subscription", "Session", "Payout"].map((tab) => (
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
              {tab} Transactions
            </button>
          ))}
        </div>
        <GeneralTable
          columns={columns}
          data={resData}
          clickableRows={true}
          openModal={true}
          modalName={"TransactionModal"}
        />
      </div>
      <PaginationLayout
        totalPages={totalPages}
        page={page}
        onChangePage={handleChangePage}
        totalItems={totalItems}
        itemsPerPage={limit}
        type={"transactions"}
      />
      <ToastContainer />
    </div>
  );
};

export default TransactionTabs;
