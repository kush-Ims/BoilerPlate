import React, { useEffect, useState } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { fetchItems } from "../../Data/api";

export default function BarChart() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchItems()
      .then((data) => setTodos(data))
      .catch((err) => console.error(err));
  }, []);

  const users = [...new Set(todos.map((t) => t.userId))];
  const completed = users.map((id) => todos.filter(t => t.userId === id && t.completed).length);
  const pending = users.map((id) => todos.filter(t => t.userId === id && !t.completed).length);

  const series = [
    { data: completed, label: "Completed", stack: "total", color: "#4caf50" },
    { data: pending, label: "Pending", stack: "total", color: "#f44336" },
  ];

  const xAxis = [{ data: users.map(id => `User ${id}`), scaleType: "band" }];

  return <BarChart width={600} height={350} series={series} xAxis={xAxis} />;
}
