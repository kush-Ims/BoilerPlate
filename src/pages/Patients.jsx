// // src/pages/Patients.jsx
// import React, { useState } from "react";
// import Navbar from "../Components.jsx/Navbar";
// import Sidebar from "../Components.jsx/Sidebar";
// import DataTable from "../Components.jsx/Datatable";

// function Patients() {
//   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

//   const toggleSidebar = () => {
//     setSidebarCollapsed(!sidebarCollapsed);
//   };

//   return (
//     <div className="h-screen flex flex-col text-white">
//       {/* Navbar */}
//       <Navbar onToggleSidebar={toggleSidebar} />

//       <div className="flex flex-1">
//         {/* Sidebar */}
//         <Sidebar collapsed={sidebarCollapsed} onToggleSidebar={toggleSidebar} />

//         {/* Main Content */}
//         <div
//           className={`flex-1 p-4 bg-[#f4f3ef] overflow-y-auto transition-all duration-300 ${
//             sidebarCollapsed ? "ml-16" : "ml-64"
//           }`}
//         >
    
//           <DataTable />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Patients;

import React, { useEffect, useState } from "react";
import { fetchItems } from "../Data/api"; // 👈 import here

function Patients() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchItems();
        setTodos(data);
      } catch (err) {
        console.error(err);
      }
    }
    loadData();
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold">Todos List</h1>
      <ul>
        {todos.slice(0, 10).map((todo) => (
          <li key={todo.id}>
            {todo.id}. {todo.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Patients;
