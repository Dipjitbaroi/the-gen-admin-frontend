import { useState } from "react";
import SessionModal from "./SessionModal";
import GeneralTable from "../../layout/Table/GeneralTable";

const AllSessionsTable = () => {
  const [openModal, setOpenModal] = useState(false);

  const rows = [
    {
      session_with: "Haylie George",
      date: "01/02/2023",
      time: "10:00 AM",
      status: "Completed",
      duration: "10 Minutes",
      booked_by: "Ahmad Bergson",
    },
    {
      session_with: "Haylie George",
      date: "02/02/2023",
      time: "2:00 PM",
      status: "Upcoming",
      duration: "15 Minutes",
      booked_by: "Leo Passaquindici Arcand",
    },
  ];
  const columns = [
    { id: "date", label: "Date" },
    { id: "time", label: "Time" },
    { id: "session_with", label: "Session With" },
    { id: "duration", label: "Duration" },
    { id: "status", label: "Status" },
    { id: "booked_by", label: "Booked By" },
  ];

  return (
    <div>
      <GeneralTable columns={columns} data={rows} clickableRows={true} navLink={"/dashboard"} />
      {/* Modal */}
      <SessionModal open={openModal} onClose={() => setOpenModal(false)} />
    </div>
  );
};

export default AllSessionsTable;
