import React from "react";
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

const NotificationTable = () => {
  const rows = [
    { id: "#001", title: "System Update", status: "Sent", date: "2023-01-01" },
    {
      id: "#002",
      title: "Maintenance Alert",
      status: "Pending",
      date: "2023-01-02",
    },
    {
      id: "#003",
      title: "Promotion Offer",
      status: "Draft",
      date: "2023-01-03",
    },
  ];

  return (
    <TableContainer component={Paper} className="shadow-lg">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.title}</TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  size="small"
                  className="mr-2"
                  onClick={() => console.log(`Edit ${row.id}`)}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={() => console.log(`Delete ${row.id}`)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default NotificationTable;
