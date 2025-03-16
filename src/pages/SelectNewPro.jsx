import { useState, useEffect } from "react";
import { format, addMinutes } from "date-fns";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import {
  useFindProOnThatTimeQuery,
  useUpdateBookingMutation,
} from "../services/apiConfig";
import { useLocation, useNavigate } from "react-router-dom";
import PaginationLayout from "../components/layout/Pagination/pagination";
import SearchBar from "../components/layout/Searchbar/Searchbar";
import { toast, ToastContainer } from "react-toastify";
import Loader from "../components/layout/Loader/Loader";

const SelectNewPro = () => {
  const [updateBooking, { isLoading: isUpdating }] = useUpdateBookingMutation();
  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location.state?.booking;
  const [page, setPage] = useState(1);
  const [selectedPro, setSelectedPro] = useState(null); // State for selected professional
  const limit = 10;

  const endTime = format(
    addMinutes(
      new Date(`${bookingData.date}T${bookingData.time}`),
      parseInt(bookingData.duration)
    ),
    "HH:mm"
  );

  const { data, error, isLoading } = useFindProOnThatTimeQuery({
    page,
    limit,
    date: bookingData.date,
    startTime: bookingData.time,
    timezone: bookingData.timezone,
    endTime: endTime,
  });

  useEffect(() => {
    if (error) {
      toast.error("Error fetching professionals");
    }
  }, [error]);

  const rawData = data?.data || [];
  const totalPages = data?.pagination?.totalPages || 1;
  const totalItems = data?.pagination?.total || 0;

  const safeValue = (value) => (value ? value : "null");

  const formattedData = rawData.map((pro) => ({
    _id: pro._id, // Store _id for update
    name: `${pro.first_name} ${pro.last_name}`,
    gender: safeValue(pro.gender),
    pronouns: safeValue(pro.pronouns),
    date: format(new Date(pro.createdAt), "yyyy-MM-dd"),
  }));

  const columns = [
    { id: "name", label: "Name" },
    { id: "gender", label: "Gender" },
    { id: "pronouns", label: "Pronouns" },
    { id: "date", label: "Joined Date" },
  ];

  if (isLoading) return <Loader />;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowClick = (row) => {
    setSelectedPro(row); // Set selected pro in state
  };

  const handleSave = async () => {
    if (!selectedPro) {
      toast.warn("Please select a professional first!");
      return;
    }

    try {
      const result = await updateBooking({
        id: bookingData._id, // Ensure correct booking ID is passed
        updateData: {
          newUserId: selectedPro._id, // Pass selected professional's ID
          timezone: bookingData.timezone,
        },
      }).unwrap();

      toast.success(result.data.message || "Booking updated successfully!");
    } catch (error) {
      console.error("Failed to update booking:", error);
      toast.error("Failed to update booking.");
    }
  };

  const handleCancel = () => {
    setSelectedPro(null); // Reset selected professional
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <div className="flex items-center mb-4">
            <button className="mr-2" onClick={() => navigate(-1)}>
              <ArrowBack />
            </button>
            <h1 className="text-4xl font-bold text-gray-800">
              Select A New Pro
            </h1>
          </div>
          <p className="text-[#666666] text-sm">
            Pros available at{" "}
            {format(
              new Date(`${bookingData.date}T${bookingData.time}`),
              "hh:mm a"
            )}{" "}
            on {format(new Date(bookingData.date), "dd/MM/yyyy")}
          </p>
        </div>
        <div>
          <div className="flex gap-2">
            <SearchBar />

            <button
              className="border-2 border-[#8734A3] text-[#8734A3] hover:bg-gray-200 py-2 px-4 rounded-lg font-semibold"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              className="bg-[#8734A3] hover:bg-[#742985] text-white py-2 px-4 rounded-lg font-semibold"
              onClick={handleSave}
              disabled={!selectedPro || isUpdating}
            >
              {isUpdating ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-300">
        <TableContainer component={Paper} className="shadow-lg">
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((col) => (
                  <TableCell key={col.id}>
                    <p className="font-semibold">{col.label}</p>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {formattedData.map((row, index) => (
                <TableRow
                  key={index}
                  onClick={() => handleRowClick(row)}
                  style={{
                    backgroundColor:
                      selectedPro?._id === row._id ? "#E6E6FA" : "white",
                    cursor: "pointer",
                  }}
                >
                  {columns.map((col) => (
                    <TableCell key={col.id}>{row[col.id]}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <PaginationLayout
        totalPages={totalPages}
        page={page}
        onChangePage={handleChangePage}
        totalItems={totalItems}
        itemsPerPage={limit}
        type={"pros"}
      />
      <ToastContainer />
    </div>
  );
};

export default SelectNewPro;
