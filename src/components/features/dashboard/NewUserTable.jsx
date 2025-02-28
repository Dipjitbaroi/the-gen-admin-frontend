import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const NewUsersTable = ({ columns, data }) => {
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
      <button className="bg-white border-2 border-[#8734A3] text-[#8734A3] py-2 px-4 rounded-lg w-full mt-4 font-semibold">
        View All
      </button>
    </TableContainer>
  );
};

export default NewUsersTable;
