import { useState, useEffect, useCallback } from "react";
import { format } from "date-fns"; // For date formatting
import GeneralTable from "../../layout/Table/GeneralTable";
import PaginationLayout from "../../layout/Pagination/pagination";
import { useGetUsersQuery } from "../../../services/apiConfig";
import FilterSearchBar from "../../layout/Searchbar/SearchBarWithFilter";
import debounce from "lodash/debounce";
import { toast, ToastContainer } from "react-toastify";
import InviteUserModal from "./InviteUserModal";
import InviteAdminModal from "./InviteAdminModal";
import Loader from "../../layout/Loader/Loader";

const UserManagementTabs = () => {
  const [activeTab, setActiveTab] = useState("App Users");
  const [page, setPage] = useState(1);
  const [isInviteUserModalOpen, setInviteUserModalOpen] = useState(false); // State for user modal
  const [isInviteAdminModalOpen, setInviteAdminModalOpen] = useState(false); // State for admin modal
  const [searchQuery, setSearchQuery] = useState(""); // New state for search input value
  const limit = 10; // Number of items per page

  // Determine user type based on activeTab
  let type = activeTab === "Administrators" ? "admin" : "app";

  const { data, error, isLoading } = useGetUsersQuery({
    page,
    limit,
    type,
    search: searchQuery, // Include search query in the API request
  });
  useEffect(() => {
    if (error) {
      toast.error("Error fetching users");
    }
  }, [error]);

  // Ensure data is safely handled
  const rawData = data?.data || [];
  const totalPages = data?.pagination?.totalPages || 1;
  const totalItems = data?.pagination?.total || 0;

  // Function to return "null" if the value is missing
  const safeValue = (value) =>
    value !== undefined && value !== null ? value : "null";

  // Format user data based on the active tab
  const resData =
    type === "admin"
      ? rawData.map((user) => ({
          _id: safeValue(user._id),
          full_name: safeValue(user.full_name),
          email: safeValue(user.email),
          phone: safeValue(user.phone),
          role: user.role?.name || "null",
          dob: safeValue(
            user.dob ? format(new Date(user.dob), "dd/MM/yyyy") : "null"
          ),
        }))
      : rawData.map((user) => ({
          _id: safeValue(user._id),
          full_name: safeValue(
            `${user.first_name || ""} ${user.last_name || ""}`.trim()
          ),
          username: safeValue(user.username),
          email: safeValue(user.email),
          dob: safeValue(user.dob),
          gender: safeValue(user.gender),
          pronouns: safeValue(user.pronouns),
          phone: safeValue(user.phone),
          subscription: safeValue(user.plan_id?.name ?? "null"),
          bio: safeValue(user.bio),
          type:
            user.role === "user"
              ? "Peer"
              : user.role === "pro"
              ? "Pro"
              : "null",
          created_at: user.created_at
            ? format(new Date(user.created_at), "dd/MM/yyyy hh:mm a")
            : "null",
        }));

  // Define columns based on the active tab
  const columns =
    type === "admin"
      ? [
          { id: "full_name", label: "Name" },
          { id: "email", label: "Email" },
          { id: "phone", label: "Phone" },
          { id: "role", label: "Role" },
        ]
      : [
          { id: "full_name", label: "Name" },
          { id: "gender", label: "Gender" },
          { id: "pronouns", label: "Pronouns" },
          { id: "type", label: "Type" },
          { id: "created_at", label: "Joined Date" },
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

  const handleInviteClick = () => {
    if (activeTab === "Administrators") {
      setInviteAdminModalOpen(true);
    } else {
      setInviteUserModalOpen(true);
    }
  };

  if (isLoading) return <Loader />;

  return (
    <>
      <div className="w-full">
        <div className="flex justify-between items-center mb-6 h-12">
          <h1 className="text-4xl font-bold text-gray-800">User Management</h1>
          <div className="flex gap-4 h-full">
            <FilterSearchBar onSearchChange={handleSearchChange} />
            <button
              className="bg-[#8734A3] hover:bg-[#742985] text-white py-2 px-6 rounded-lg font-semibold w-fit"
              onClick={handleInviteClick} // Open the respective modal
            >
              {activeTab === "Administrators"
                ? "Invite Administrators"
                : "Invite App User"}
            </button>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-300">
          <div className="flex border-b border-gray-300 w-full">
            {["App Users", "Administrators"].map((tab) => (
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
          <GeneralTable
            columns={columns}
            data={resData}
            clickableRows={true}
            openModal={activeTab === "Administrators"}
            isNavigate={activeTab === "App Users"}
            navLink={"/users/details"}
            modalName={"AboutUserModal"}
          />
        </div>
        <PaginationLayout
          totalPages={totalPages}
          page={page}
          onChangePage={handleChangePage}
          totalItems={totalItems}
          itemsPerPage={limit}
          type={"users"}
        />
        <InviteUserModal
          open={isInviteUserModalOpen}
          onClose={() => setInviteUserModalOpen(false)}
        />
        <InviteAdminModal
          open={isInviteAdminModalOpen}
          onClose={() => setInviteAdminModalOpen(false)}
        />
      </div>
      <ToastContainer />
    </>
  );
};

export default UserManagementTabs;
