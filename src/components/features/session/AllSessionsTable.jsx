import { useState } from "react";
import SessionModal from "./SessionModal";
import GeneralTable from "../../layout/Table/GeneralTable";
import { useGetSessionsQuery } from "../../../services/apiConfig";

const AllSessionsTable = () => {
  const [openModal, setOpenModal] = useState(false);
  const { data } = useGetSessionsQuery();

  console.log(data);

  const resData = data?.data || [];

  const rows = [
    {
      date: "2025-02-10",
      time: "09:00",
      sessionWith: "John Doe",
      bookedBy: "John Doe",
      duration: "30 Minutes",
      status: "confirmed",
      createdAt: "2025-02-23T15:01:15.907Z",
      isExtended: false,
      extendReqBy: null,
      extendedDuration: null,
      sessionId: "67a8b89cdd5102c25bb7158b",
    },
  ];
  const columns = [
    { id: "date", label: "Date" },
    { id: "time", label: "Time" },
    { id: "sessionWith", label: "Session With" },
    { id: "duration", label: "Duration" },
    { id: "status", label: "Status" },
    { id: "bookedBy", label: "Booked By" },
  ];

  return (
    <div>
      <GeneralTable
        columns={columns}
        data={resData}
        clickableRows={true}
        navLink={"/dashboard"}
      />
      {/* Modal */}
      <SessionModal open={openModal} onClose={() => setOpenModal(false)} />
    </div>
  );
};

export default AllSessionsTable;
