import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from "@mui/material";

const RecentTransactions = () => {
    const rows = [
        { id: "#12345", user: "John Doe", amount: "$500", date: "2023-01-01" },
        { id: "#12346", user: "Jane Smith", amount: "$300", date: "2023-01-02" },
        { id: "#12347", user: "Mike Johnson", amount: "$700", date: "2023-01-03" },
    ];

    return (
        <TableContainer component={Paper} className="shadow-lg">
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell className="bg-gray-100 font-bold">
                            Transaction ID
                        </TableCell>
                        <TableCell className="bg-gray-100 font-bold">User</TableCell>
                        <TableCell className="bg-gray-100 font-bold">Amount</TableCell>
                        <TableCell className="bg-gray-100 font-bold">Date</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => (
                        <TableRow key={index}>
                            <TableCell>{row.id}</TableCell>
                            <TableCell>{row.user}</TableCell>
                            <TableCell>{row.amount}</TableCell>
                            <TableCell>{row.date}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default RecentTransactions;
