import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  // Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const GeneralTable = ({ columns, data, openModal, clickableRows, navLink }) => {
  const navigate = useNavigate();
  const handleRowClick = (row) => {
    navigate(`${navLink}`, { state: { session: row } });
  };
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
            {/* <TableCell>
              <p className="font-semibold">Actions</p>
            </TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow
              key={index}
              onClick={clickableRows ? () => handleRowClick(row) : ""}
            >
              {columns.map((col) => (
                <TableCell key={col.id}>{row[col.id]}</TableCell>
              ))}
              {/* <TableCell>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => openModal(row)}
                >
                  View
                </Button>
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default GeneralTable;
