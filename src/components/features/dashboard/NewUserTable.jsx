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

const NewUsersTable = ({ columns, data }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/users");
  };
  return (
    <TableContainer component={Paper} className="shadow-lg p-4">
      <h1 className="text-2xl font-semibold border-b pb-4">New Users</h1>
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
            <TableRow key={index}>
              {columns.map((col) => (
                <TableCell key={col.id}>{row[col.id]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <button
        className="bg-white hover:bg-gray-100 border-2 border-[#8734A3] text-[#8734A3] py-2 px-4 rounded-lg w-full mt-4 font-semibold"
        onClick={handleClick}
      >
        View All
      </button>
    </TableContainer>
  );
};

export default NewUsersTable;
