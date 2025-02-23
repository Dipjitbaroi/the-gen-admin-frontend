import TransactionTabs from "../components/features/transactions/TransactionTabs.jsx";
import PaginationLayout from "../components/layout/Pagination/pagination.jsx";
import SearchBar from "../components/layout/Searchbar/Searchbar.jsx";
import {
  useCreatePostMutation,
  useGetPostQuery,
} from "../services/apiConfig.js";

const Transactions = () => {
  const { data } = useGetPostQuery();
  const [createPost, {isLoading}] = useCreatePostMutation();
  const handleCreatePost = async ()=> {
    try{
      const res = await createPost()
    }catch{

    }
  }
  console.log(data);
  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Transactions</h1>
        {/* <input
          type="text"
          placeholder="Search..."
          className="border border-gray-300 rounded-lg p-2 text-sm"
        /> */}
        <SearchBar />
      </div>

      {/* Tabs Section */}
      <TransactionTabs />
      <PaginationLayout />
    </div>
  );
};

export default Transactions;
