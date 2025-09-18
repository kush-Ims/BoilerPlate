import React, { useEffect, useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { fetchItems } from "../../Data/api";

export default function DoughnutChart() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchItems()
      .then((data) => setTodos(data))
      .catch((err) => console.error(err));
  }, []);

  const users = [...new Set(todos.map(t => t.userId))];
  const completedPerUser = users.map(id => todos.filter(t => t.userId === id && t.completed).length);

  const series = users.map((id, i) => ({
    value: completedPerUser[i],
    label: `User ${id}`
  }));

  return <PieChart width={350} height={350} series={series} innerRadius={80} />;
}
