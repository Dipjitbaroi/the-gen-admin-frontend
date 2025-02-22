import React, { useState } from "react";
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
      topic: "React Basics",
      date: "2023-01-01",
      time: "10:00 AM",
      status: "Completed",
    },
    {
      topic: "Tailwind CSS",
      date: "2023-01-02",
      time: "2:00 PM",
      status: "Upcoming",
    },
  ];

  return (
    <div>
      <TableContainer component={Paper} className="shadow-lg">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Topic</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.topic}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.time}</TableCell>
                <TableCell>{row.status}</TableCell>
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
