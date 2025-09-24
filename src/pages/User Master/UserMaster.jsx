  import React, { useState, useMemo } from "react";
  import { TextField } from "@mui/material";
  import toast, { Toaster } from "react-hot-toast";
  import UserModal from "./AddUserModal";
  import DataTable from "../../Components.jsx/Datatable";

  // Sample data for users
  const initialUsers = [
    { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "Admin", status: "Active" },
    { id: 2, name: "Bob Smith", email: "bob@example.com", role: "User", status: "Inactive" },
    { id: 3, name: "Charlie Brown", email: "charlie@example.com", role: "Moderator", status: "Active" },
    { id: 4, name: "Sez On the Beat", email: "sezonthe@beat.com", role: "User", status: "Active" },
    { id: 5, name: "Vickey Kaushal", email: "vickey@example.com", role: "Admin", status: "Active" },
    { id: 6, name: "DL91", email: "dl91@example.com", role: "Moderator", status: "Inactive" },
    { id: 7, name: "Mickey Mouse", email: "mouse@example.com", role: "Admin", status: "Inactive" },
    { id: 8, name: "Daffy Duck", email: "daffy@example.com", role: "Moderator", status: "Active" },
    { id: 9, name: "Iron Man", email: "man@example.com", role: "User", status: "Active" },
    { id: 10, name: "Aqua Man", email: "aqua@example.com", role: "Moderator", status: "Active" },
  ];

  const UserMaster = () => {
    const [users, setUsers] = useState(initialUsers);
    const [search, setSearch] = useState("");

    const [modalOpen, setModalOpen] = useState(false);
    const [modalFields, setModalFields] = useState([]);
    const [modalTitle, setModalTitle] = useState("");
    const [editingUser, setEditingUser] = useState(null);

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

    const handleEdit = (user) => {
      setEditingUser(user);
      setModalTitle("Edit User");
      setModalFields([
        { label: "Name", name: "name", value: user.name },
        { label: "Email", name: "email", value: user.email },
        { label: "Role", name: "role", value: user.role },
        { label: "Status", name: "status", value: user.status },
      ]);
      setModalOpen(true);
    };

    const handleAddUser = () => {
      setEditingUser(null);
      setModalTitle("Add New User");
      setModalFields([
        { label: "Name", name: "name", value: "" },
        { label: "Email", name: "email", value: "" },
        { label: "Role", name: "role", value: "" },
        { label: "Status", name: "status", value: "" },
      ]);
      setModalOpen(true);
    };

    // Handle modal submit for both add/edit
    const handleSubmitModal = (formData) => {
      if (editingUser) {
        setUsers((prev) =>
          prev.map((u) => (u.id === editingUser.id ? { ...u, ...formData } : u))
        );
        toast.success("User updated successfully!");
      } else {
        const newUser = { id: Date.now(), ...formData };
        setUsers((prev) => [...prev, newUser]);
        toast.success("User added successfully!");
      }
      setModalOpen(false);
    };

    // Define columns for DataTable
    const columns = useMemo(
      () => [
        { accessorKey: "id", header: "ID" },
        { accessorKey: "name", header: "Name" },
        { accessorKey: "email", header: "Email" },
        { accessorKey: "role", header: "Role" },
        {
          accessorKey: "status",
          header: "Status",
          Cell: ({ cell }) => (
            <span
              className={`px-2 py-1 rounded-full text-white text-xs ${
                cell.getValue() === "Active" ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {cell.getValue()}
            </span>
          ),
        },
      ],
      []
    );

    return (
      <div className="p-2 bg-[#f4f3ed] min-h-screen">
        <Toaster position="top-right" />

        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">User Master</h1>
          <button
            onClick={handleAddUser}
            className="mt-3 md:mt-0 bg-[#FFD369] hover:bg-[#e6c055] text-black font-semibold px-5 py-2 rounded-lg shadow-md transition duration-200"
          >
            + Add New User
          </button>
        </div>

        {/* Search Box */}
        <div className="mb-4">
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search by name, email or role"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-white rounded-lg !hover:border-gray-400"
          />
        </div>

        {/* ✅ Integrated DataTable */}
        <div className="overflow-x-auto">
          <DataTable
            columns={columns}
            data={filteredUsers}
            onEdit={handleEdit}
            onDelete={handleDelete}
            enableTopToolbar={false}
          />
        </div>

        {/* ✅ Common Modal Integration */}
        <UserModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          title={modalTitle}
          fields={modalFields}
          onSubmit={handleSubmitModal}
        />
      </div>
    );
  };

  export default UserMaster;
