import React, { useEffect, useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { fetchItems } from "../../Data/api";

export default function PieChart() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchItems()
      .then((data) => setTodos(data))
      .catch((err) => console.error(err));
  }, []);

  const completed = todos.filter(t => t.completed).length;
  const pending = todos.filter(t => !t.completed).length;

  const series = [
    { value: completed, label: "Completed", color: "#4caf50" },
    { value: pending, label: "Pending", color: "#f44336" },
  ];

  return <PieChart width={350} height={350} series={series} />;
}
