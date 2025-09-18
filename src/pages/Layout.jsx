import React, { useState, useEffect } from "react";
import Navbar from "../Components.jsx/Navbar";
import Sidebar from "../Components.jsx/Sidebar";
import DCards from "../Components.jsx/DCards";
import { LineChart } from "@mui/x-charts/LineChart";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";

import { fetchItems } from "../Data/api";

function layout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [tasks, setTasks] = useState([]);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  useEffect(() => {
    fetchItems()
      .then((data) => setTasks(data))
      .catch((err) => console.error(err));
  }, []);

  // Prepare data for charts
  const completed = tasks.filter((t) => t.completed).length;
  const pending = tasks.length - completed;

  // Todos per user (for BarChart)
  const todosPerUser = tasks.reduce((acc, todo) => {
    acc[todo.userId] = (acc[todo.userId] || 0) + 1;
    return acc;
  }, {});
  const barData = Object.values(todosPerUser);
  const barCategories = Object.keys(todosPerUser);

  return (
    <div className="h-screen flex flex-col text-white">
      <Navbar onToggleSidebar={toggleSidebar} />

      <div className="flex flex-1">
        <Sidebar collapsed={sidebarCollapsed} onToggleSidebar={toggleSidebar} />

        <div
          className={`flex-1 p-4 bg-[#f4f3ed] overflow-y-auto transition-all duration-300 
          ${sidebarCollapsed ? "ml-16" : "ml-64"}`}
        >
          <DCards darkMode />

          {/* Charts Section */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Bar Chart */}
            <div className="bg-white rounded-lg shadow p-4">
              <BarChart
                xAxis={[{ data: barCategories, scaleType: "band" }]}
                series={[{ data: barData, label: "Todos per User" }]}
                width={800}
                height={300}
              />
            </div>

            <div className="bg-white rounded-lg shadow p-4">
              <PieChart
                series={[
                  {
                    data: [
                      { id: 0, value: completed, label: "Completed" },
                      { id: 1, value: pending, label: "Pending" },
                    ],
                  },
                ]}
                width={400}
                height={250}
              />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default layout;
