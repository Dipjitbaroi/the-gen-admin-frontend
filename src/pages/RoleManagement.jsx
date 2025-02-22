import React from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const RoleManagement = () => {
  const roles = [
    { id: 1, role: "Admin", usersCount: 5 },
    { id: 2, role: "User", usersCount: 20 },
    { id: 3, role: "Editor", usersCount: 8 },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Role Management</h1>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Role</TableCell>
                <TableCell>Users Count</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {roles.map((role) => (
                <TableRow key={role.id}>
                  <TableCell>{role.role}</TableCell>
                  <TableCell>{role.usersCount}</TableCell>
                  <TableCell>
                    <Button variant="outlined" color="primary" className="mr-2">
                      Edit
                    </Button>
                    <Button variant="outlined" color="error">
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default RoleManagement;
