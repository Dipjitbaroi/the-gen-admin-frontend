import { useState } from "react";
import GeneralTable from "../../layout/Table/GeneralTable";
import TransactionModal from "./TransactionModal";

const SubscriptionTransactionsTable = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

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
  const columns = [
    { id: "id", label: "Transaction ID" },
    { id: "type", label: "Type" },
    { id: "user", label: "User" },
    { id: "date", label: "Date & Time" },
    { id: "amount", label: "Amount" },
    { id: "method", label: "Method" },
  ];

  const handleOpenModal = (transaction) => {
    setSelectedTransaction(transaction);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedTransaction(null);
  };

  return (
    <div>
      <GeneralTable columns={columns} data={rows} openModal={handleOpenModal} />
      {selectedTransaction && (
        <TransactionModal
          open={openModal}
          onClose={handleCloseModal}
          transaction={selectedTransaction}
        />
      )}
    </div>
  );
};

export default SubscriptionTransactionsTable;
