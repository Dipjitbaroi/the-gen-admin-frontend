
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

const AllNotificationTable = () => {
  const rows = [
    { campaign: "New Pros", content: "sjhsdjahkgjh", audience: "Everyone", type: "In-App", created_on: "2023-01-01", created_by: "Vicente Lonzono", published_on: "2023-01-01" },
    { campaign: "New Pros", content: "angsrhe", audience: "Everyone", type: "In-App", created_on: "2023-01-01", created_by: "Vicente Lonzono", published_on: "2023-01-01" },
    { campaign: "New Pros", content: "jkhactyauyl", audience: "Everyone", type: "In-App", created_on: "2023-01-01", created_by: "Vicente Lonzono", published_on: "2023-01-01" },
  ];

  return (
    <TableContainer component={Paper} className="shadow-lg">
      <Table>
        <TableHead>
          <TableRow>
          <TableCell>
              <p className="font-semibold">Campaign</p>
            </TableCell>
            <TableCell>
              <p className="font-semibold">Content</p>
            </TableCell>
            <TableCell>
              <p className="font-semibold">Audience</p>
            </TableCell>
            <TableCell>
              <p className="font-semibold">Type</p>
            </TableCell>
            <TableCell>
              <p className="font-semibold">Created On</p>
            </TableCell>
            <TableCell>
              <p className="font-semibold">Published On</p>
            </TableCell>
            <TableCell>
              <p className="font-semibold">Created By</p>
            </TableCell>
            <TableCell>
              <p className="font-semibold">Action</p>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.campaign}</TableCell>
              <TableCell>{row.content}</TableCell>
              <TableCell>{row.audience}</TableCell>
              <TableCell>{row.type}</TableCell>
              <TableCell>{row.created_on}</TableCell>
              <TableCell>{row.published_on}</TableCell>
              <TableCell>{row.created_by}</TableCell>
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

export default AllNotificationTable;
