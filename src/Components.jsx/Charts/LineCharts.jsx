import React, { useEffect, useState } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { fetchItems } from "../../Data/api";

export default function LineChart() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchItems()
      .then((data) => setTodos(data))
      .catch((err) => console.error(err));
  }, []);

  const users = [...new Set(todos.map(t => t.userId))];
  const cumulativeCompleted = users.map((id, idx) =>
    todos.filter(t => t.userId <= id && t.completed).length
  );

  const series = [{ data: cumulativeCompleted, label: "Cumulative Completed Todos", color: "#1976d2" }];
  const xAxis = [{ data: users.map(id => `User ${id}`), scaleType: "band" }];

  return <LineChart width={600} height={350} series={series} xAxis={xAxis} />;
}
