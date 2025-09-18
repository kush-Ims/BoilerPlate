import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { fetchItems } from "../Data/api"; // ✅ use your API service

export default function DataTable() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from your API
  useEffect(() => {
    fetchItems()
      .then((data) => {
        // Map API response into DataGrid format
        const mappedData = data.map((todo) => ({
          id: todo.id,
          title: todo.title,
          completed: todo.completed ? "✅ Done" : "❌ Pending",
          userId: todo.userId,
        }));
        setTodos(mappedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching todos:", error);
        setLoading(false);
      });
  }, []);

  // Define columns for the DataGrid
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "title", headerName: "Task Title", width: 400 },
    { field: "completed", headerName: "Status", width: 150 },
    { field: "userId", headerName: "User ID", width: 120 },
  ];

  return (
    <Box sx={{ height: 600, width: "100%", padding: 0 }}>
      <h2 className="text-xl font-semibold pt-1 mb-3 text-black">
        Tasks List
      </h2>
      <DataGrid
        rows={todos}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10, 20, 50]}
        loading={loading}
        disableSelectionOnClick
      />
    </Box>
  );
}
