import React, { useEffect, useState } from "react";
import { CheckCircle, XCircle, Users, ListTodo } from "lucide-react";
import { fetchItems } from "../Data/api"; // 👈 already points to /todos

function Dcards() {
  const [stats, setStats] = useState({
    totalTodos: 0,
    completedTodos: 0,
    pendingTodos: 0,
    uniqueUsers: 0,
  });

  useEffect(() => {
    async function loadStats() {
      try {
        const todos = await fetchItems(); // fetch from jsonplaceholder /todos

        const totalTodos = todos.length;
        const completedTodos = todos.filter((t) => t.completed).length;
        const pendingTodos = totalTodos - completedTodos;
        const uniqueUsers = new Set(todos.map((t) => t.userId)).size;

        setStats({ totalTodos, completedTodos, pendingTodos, uniqueUsers });
      } catch (err) {
        console.error("Failed to load stats", err);
      }
    }

    loadStats();
  }, []);

  const features = [
    {
      title: "Total Todos",
      value: stats.totalTodos,
      description: "All todos in the system",
      icon: <ListTodo className="h-6 w-6 text-[#272523]" />,
    },
    {
      title: "Completed Todos",
      value: stats.completedTodos,
      description: "Tasks already completed",
      icon: <CheckCircle className="h-6 w-6 text-[#272523]" />,
    },
    {
      title: "Pending Todos",
      value: stats.pendingTodos,
      description: "Tasks yet to be done",
      icon: <XCircle className="h-6 w-6 text-[#272523]" />,
    },
    {
      title: "Unique Users",
      value: stats.uniqueUsers,
      description: "Users assigned with todos",
      icon: <Users className="h-6 w-6 text-[#272523]" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-6 p-1">
      {features.map((item, i) => (
        <div key={i} className="p-[2px] rounded-xl shadow-lg">
          <div className="bg-white rounded-xl p-6 h-full flex flex-col justify-between">
            <div className="flex justify-between items-center mb-1">
              <div className="text-3xl font-bold text-gray-900">{item.value}</div>
              <div className="bg-[#FFD369] p-3 rounded-full flex items-center justify-center shadow-md hover:bg-gray-100">
                {item.icon}
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.title}</h3>
            <p className="text-sm text-gray-500">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Dcards;
