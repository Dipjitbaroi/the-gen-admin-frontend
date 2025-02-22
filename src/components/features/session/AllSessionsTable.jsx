import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import SessionModal from "./SessionModal";

const AllSessionsTable = () => {
  const [openModal, setOpenModal] = useState(false);

  const rows = [
    {
      session_with: "Haylie George",
      date: "01/01/2023",
      time: "10:00 AM",
      status: "Completed",
      duration: "10 Minutes",
      booked_by: "Ahmad Bergson",
    },
    {
      session_with: "Haylie George",
      date: "01/02/2023",
      time: "2:00 PM",
      status: "Upcoming",
      duration: "15 Minutes",
      booked_by: "Leo Passaquindici Arcand",
    },
  ];

  return (
    <div>
      <TableContainer component={Paper} className="shadow-lg">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <p className="font-semibold">Date</p>
              </TableCell>
              <TableCell>
                <p className="font-semibold">Time</p>
              </TableCell>
              <TableCell>
                <p className="font-semibold">Session With</p>
              </TableCell>
              <TableCell>
                <p className="font-semibold">Duration</p>
              </TableCell>
              <TableCell>
                <p className="font-semibold">Status</p>
              </TableCell>
              <TableCell>
                <p className="font-semibold">Booked By</p>
              </TableCell>
              <TableCell>
                <p className="font-semibold">Action</p>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.time}</TableCell>
                <TableCell>{row.session_with}</TableCell>
                <TableCell>{row.duration}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>{row.booked_by}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => setOpenModal(true)}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal */}
      <SessionModal open={openModal} onClose={() => setOpenModal(false)} />
    </div>
  );
};

export default AllSessionsTable;
