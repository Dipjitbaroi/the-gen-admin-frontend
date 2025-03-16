import { ArrowBack } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import UserCard from "../components/features/session/UserCard";
import Timeline from "../components/features/session/TimeLine";
import { useGetSessionsByIdQuery } from "../services/apiConfig";
import { toast, ToastContainer } from "react-toastify";
import Loader from "../components/layout/Loader/Loader";
import currencyConfig from "../assets/currencies/currencies.json"; // Import your JSON file

const AboutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const sessionData = location.state?.session;
  const [activeTab, setActiveTab] = useState("Details");

  const { data, error, isLoading } = useGetSessionsByIdQuery({
    id: sessionData?._id,
  });

  useEffect(() => {
    if (error) {
      toast.error("Error loading session data");
    }
  }, [error]);

  if (isLoading) {
    return <Loader />;
  }

  const session = { ...data.data, _id: sessionData?._id };

  // Function to format charge amount with currency symbol
  const formatCharge = (amount) => {
    const currency = currencyConfig.currencies["MAIN"]; // Assuming USD for now
    if (!currency) {
      return amount;
    }
    // Check if amount is defined before calling toFixed
    return amount !== undefined
      ? `${currency.symbol}${amount.toFixed(currency.decimal_places)}`
      : "N/A";
  };

  if (sessionData?.type === "completed") {
    return (
      <div>
        <div className="flex justify-between mb-4">
          <div className="flex items-center">
            <button className="mr-6" onClick={() => navigate(-1)}>
              <ArrowBack />
            </button>
            <h5 className="ml-2 text-3xl font-semibold">Sessions</h5>
          </div>
          <div className="flex gap-2">
            <button className="border-2 bg-[#8734A3] hover:bg-[#742985] text-white py-2 px-6 rounded-lg font-semibold">
              Download Transcript
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-300">
          <div className="flex border-b border-gray-300">
            {["Details", "Timeline"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex px-6 py-4 text-sm font-medium justify-center ${
                  activeTab === tab
                    ? "border-b-2 border-[#8734A3] text-[#8734A3]"
                    : "text-gray-600"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === "Details" && (
            <div className="flex p-4">
              <div className="w-2/3">
                <div className="mb-4">
                  <h6 className="text-lg font-semibold">About The Booking</h6>
                </div>
                <div className="grid grid-cols-2 gap-y-4">
                  <Detail label="Date" value={session.date || "N/A"} />
                  <Detail label="Time" value={session.time || "N/A"} />
                  <Detail label="Duration" value={session.duration || "N/A"} />
                  <Detail
                    label="Charge"
                    value={formatCharge(session.charge) || "N/A"}
                  />
                  <Detail
                    label="Transaction ID"
                    value={session.transactionId || "N/A"}
                  />
                  <Detail
                    label="Description"
                    value={session.description || "No description"}
                    className="col-span-2"
                  />
                </div>
              </div>
              <div className="border-l pl-4 w-1/3">
                <h6 className="text-lg font-semibold mb-4">People</h6>
                <div className="flex flex-col gap-4">
                  <UserCard user={session.client} />
                  <UserCard user={session.user} />
                </div>
              </div>
            </div>
          )}

          {activeTab === "Timeline" && <Timeline />}
        </div>
        <ToastContainer />
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between mb-4 h-12">
        <div className="flex items-center">
          <button className="mr-2" onClick={() => navigate(-1)}>
            <ArrowBack />
          </button>
          <h5 className="ml-2 text-3xl font-semibold">Sessions</h5>
        </div>
        <div className="flex gap-2">
          <button className=" bg-[#8734A3] hover:bg-[#742985] text-white py-2 px-6 rounded-lg font-semibold">
            Cancel Session
          </button>
        </div>
      </div>

      <div className="flex">
        <div className="w-2/3 bg-white rounded-xl p-4">
          <h6 className="text-lg font-semibold mb-4 pb-2 border-b">
            About The Booking
          </h6>
          <div className="grid grid-cols-2 gap-y-4">
            <Detail label="Date" value={session.date || "N/A"} />
            <Detail label="Time" value={session.time || "N/A"} />
            <Detail label="Duration" value={session.duration || "N/A"} />
            <Detail
              label="Charge"
              value={formatCharge(session.charge) || "N/A"}
            />
            <Detail
              label="Transaction ID"
              value={session.transactionId || "N/A"}
            />
            <Detail
              label="Description"
              value={session.description || "No description"}
              className="col-span-2"
            />
          </div>
        </div>
        <div className="ml-4 p-4 w-1/3 bg-white rounded-xl">
          <div className="flex justify-between mb-4">
            <h6 className="text-lg font-semibold mb-4">People</h6>
            <button
              onClick={() =>
                navigate("/sessions/about/select-new-pro", {
                  state: { booking: session },
                })
              }
              className="text-lg font-semibold mb-4 text-[#8734A3] hover:text-[#742985]"
            >
              Change Pro
            </button>
          </div>
          <div className="flex flex-col gap-4">
            <UserCard user={session.client} />
            <UserCard user={session.user} />
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

const Detail = ({ label, value, className = "" }) => (
  <div className={`flex flex-col ${className}`}>
    <p className="text-sm text-[#666666]">{label}</p>
    <p className="text-base">{value}</p>
  </div>
);

export default AboutPage;
