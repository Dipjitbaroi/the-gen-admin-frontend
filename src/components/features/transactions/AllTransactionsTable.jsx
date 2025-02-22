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
import TransactionModal from "./TransactionModal";

const AllTransactionsTable = () => {
  const [openModal, setOpenModal] = useState(false);
  const rows = [
    {
      id: "001",
      type: "Subscription",
      amount: "$100",
      date: "2023-01-01",
      user: "xdy",
      method: "cash",
    },
    {
      id: "002",
      type: "Session",
      amount: "$50",
      date: "2023-01-02",
      user: "ydx",
      method: "card",
    },
    {
      id: "003",
      type: "Payout",
      amount: "$200",
      date: "2023-01-03",
      user: "xyz",
      method: "bank transfer",
    },
  ];

  const cols = [
    { id: "1", label: "Transaction ID", name: "id" },
    { id: "2", label: "Type", name: "type" },
    { id: "3", label: "User", name: "user" },
    { id: "4", label: "Date & Time", name: "date" },
    { id: "5", label: "Amount", name: "amount" },
    { id: "6", label: "Method", name: "method" },
  ];
  

  return (
    <div>
      <TableContainer component={Paper} className="shadow-lg">
        <Table>
          <TableHead>
            <TableRow>
              {cols.map((col) => (
                <TableCell key={col.id}>
                  <p className="font-semibold">{col.label}</p>
                </TableCell>
              ))}
              <TableCell><p className="font-semibold">Action</p></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                {cols.map((col) => (
                  <TableCell key={col.id}>{row[col.name]}</TableCell>
                ))}

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
