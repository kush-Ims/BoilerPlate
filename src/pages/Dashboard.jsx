// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import DCards from "../Components.jsx/DCards";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";
import { fetchItems } from "../Data/api";

function Dashboard() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchItems()
      .then((data) => setTasks(data))
      .catch((err) => console.error(err));
  }, []);

  // Prepare data
  const completed = tasks.filter((t) => t.completed).length;
  const pending = tasks.length - completed;

  const todosPerUser = tasks.reduce((acc, todo) => {
    acc[todo.userId] = (acc[todo.userId] || 0) + 1;
    return acc;
  }, {});
  const barData = Object.values(todosPerUser);
  const barCategories = Object.keys(todosPerUser);

  return (
    <div>
      <DCards darkMode />

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* ✅ Bar Chart */}
        <div className="bg-white rounded-lg shadow p-4 overflow-x-auto max-w-full">
          <div className="w-[800px]">
            <BarChart
              xAxis={[{ data: barCategories, scaleType: "band" }]}
              series={[{ data: barData, label: "Todos per User" }]}
              width={800}
              height={300}
            />
          </div>
        </div>

        {/* ✅ Pie Chart */}
        <div className="bg-white rounded-lg shadow p-4 overflow-x-auto">
          <div className="min-w-[300px]">
            <PieChart
              series={[
                {
                  data: [
                    { id: 0, value: completed, label: "Completed" },
                    { id: 1, value: pending, label: "Pending" },
                  ],
                },
              ]}
              height={250}
              style={{ width: "100%" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
