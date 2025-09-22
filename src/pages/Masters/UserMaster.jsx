import React, { useState, useEffect, useMemo } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";
import { Edit, Delete, Visibility } from "@mui/icons-material";
import toast, { Toaster } from "react-hot-toast";

// Sample data for users
const initialUsers = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "Admin", status: "Active" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", role: "User", status: "Inactive" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com", role: "Moderator", status: "Active" },
];

const UserMaster = () => {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Filter users based on search
  const filteredUsers = useMemo(
    () =>
      users.filter(
        (u) =>
          u.name.toLowerCase().includes(search.toLowerCase()) ||
          u.email.toLowerCase().includes(search.toLowerCase()) ||
          u.role.toLowerCase().includes(search.toLowerCase())
      ),
    [users, search]
  );

  const handleDelete = (id) => {
    toast.success("User deleted!");
    setUsers(users.filter((u) => u.id !== id));
  };

  const handleEdit = (id) => {
    toast("Edit user feature coming soon!", { icon: "✏️" });
  };

  const handleView = (id) => {
    toast("View user details feature coming soon!", { icon: "👀" });
  };

  return (
    <div className="p-6 bg-[#f4f3ed] min-h-screen">
      <Toaster position="top-right" />

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">User Master</h1>
        <button className="mt-3 md:mt-0 bg-[#FFD369] hover:bg-[#e6c055] text-black font-semibold px-5 py-2 rounded-lg shadow-md transition duration-200">
          + Add New User
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition duration-300">
          <p className="text-gray-500">Total Users</p>
          <p className="text-2xl font-bold">{users.length}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition duration-300">
          <p className="text-gray-500">Active Users</p>
          <p className="text-2xl font-bold text-green-600">
            {users.filter((u) => u.status === "Active").length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition duration-300">
          <p className="text-gray-500">Inactive Users</p>
          <p className="text-2xl font-bold text-red-500">
            {users.filter((u) => u.status === "Inactive").length}
          </p>
        </div>
      </div>

      {/* Search Box */}
      <div className="mb-4">
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search by name, email or role"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-white rounded-lg"
        />
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-md overflow-x-auto">
        <Table>
          <TableHead className="bg-gray-100">
            <TableRow>
              <TableCell className="font-semibold">ID</TableCell>
              <TableCell className="font-semibold">Name</TableCell>
              <TableCell className="font-semibold">Email</TableCell>
              <TableCell className="font-semibold">Role</TableCell>
              <TableCell className="font-semibold">Status</TableCell>
              <TableCell align="right" className="font-semibold">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user) => (
                <TableRow key={user.id} hover>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-white text-xs ${
                        user.status === "Active" ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {user.status}
                    </span>
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="View">
                      <IconButton onClick={() => handleView(user.id)}>
                        <Visibility />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit">
                      <IconButton onClick={() => handleEdit(user.id)}>
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton onClick={() => handleDelete(user.id)}>
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <TablePagination
          component="div"
          count={filteredUsers.length}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) => setRowsPerPage(parseInt(e.target.value, 10))}
        />
      </div>
    </div>
  );
};

export default UserMaster;
