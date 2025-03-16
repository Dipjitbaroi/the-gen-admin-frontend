import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import TransactionModal from "../../features/transactions/TransactionModal";
import NotificationModal from "../../features/notifications/NotificationModal";
import AboutUserModal from "../../features/user/AboutUserModal";

const GeneralTable = ({
  columns,
  data,
  openModal,
  modalName,
  clickableRows,
  isNavigate,
  navLink,
}) => {
  const [selectedRow, setSelectedRow] = useState(null);
  const navigate = useNavigate();

  const handleRowClick = (row) => {
    if (isNavigate) {
      navigate(`${navLink}`, { state: { session: row } });
    } else if (openModal) {
      setSelectedRow(row);
    }
  };

  const handleCloseModal = () => {
    setSelectedRow(null);
  };

  // Create a mapping object for modals
  const modals = {
    TransactionModal: TransactionModal,
    NotificationModal: NotificationModal,
    AboutUserModal: AboutUserModal,
  };

  // Dynamically render the appropriate modal
  const ModalComponent = modals[modalName];

  return (
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
          {data.map((row, index) => (
            <TableRow
              className={clickableRows ? "hover:bg-gray-100" : ""}
              key={index}
              onClick={clickableRows ? () => handleRowClick(row) : null}
            >
              {columns.map((col) => (
                <TableCell key={col.id}>{row[col.id]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {openModal && selectedRow && ModalComponent && (
        <ModalComponent
          open={Boolean(selectedRow)}
          onClose={handleCloseModal}
          rowData={selectedRow}
        />
      )}
    </TableContainer>
  );
};

export default GeneralTable;
