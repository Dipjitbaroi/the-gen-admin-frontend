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
import TransactionModal from "./TransactionModal";

const AllTransactionsTable = () => {
  const [openModal, setOpenModal] = useState(false);

  const rows = [
    { id: "#001", type: "Subscription", amount: "$100", date: "2023-01-01" },
    { id: "#002", type: "Session", amount: "$50", date: "2023-01-02" },
    { id: "#003", type: "Payout", amount: "$200", date: "2023-01-03" },
  ];

  return (
    <div>
      <TableContainer component={Paper} className="shadow-lg">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.type}</TableCell>
                <TableCell>{row.amount}</TableCell>
                <TableCell>{row.date}</TableCell>
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
      <TransactionModal open={openModal} onClose={() => setOpenModal(false)} />
    </div>
  );
};

export default AllTransactionsTable;
