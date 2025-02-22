import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from "@mui/material";

const NewUsersTable = () => {
    const rows = [
        { name: "John Doe", email: "john@example.com", joined: "2023-01-01" },
        { name: "Jane Smith", email: "jane@example.com", joined: "2023-01-02" },
        { name: "Mike Johnson", email: "mike@example.com", joined: "2023-01-03" },
    ];

    return (
        <TableContainer component={Paper} className="shadow-lg">
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell className="bg-gray-100 font-bold">Name</TableCell>
                        <TableCell className="bg-gray-100 font-bold">Email</TableCell>
                        <TableCell className="bg-gray-100 font-bold">Joined Date</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => (
                        <TableRow key={index}>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.email}</TableCell>
                            <TableCell>{row.joined}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default NewUsersTable;
