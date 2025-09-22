import React, { useState, useEffect } from "react";
import Navbar from "../Components.jsx/Navbar";
import Sidebar from "../Components.jsx/Sidebar";

function layout({children}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="h-screen flex flex-col text-white">
      {/* Navbar always on top */}
      <Navbar onToggleSidebar={toggleSidebar} />

      <div className="flex flex-1">
        {/* Sidebar always visible */}
        <Sidebar collapsed={sidebarCollapsed} onToggleSidebar={toggleSidebar} />

        {/* Main content area */}
        <main
          className={`flex-1 p-4 bg-[#f4f3ed] overflow-y-auto transition-all duration-300 ${
            sidebarCollapsed ? "ml-16" : "ml-64"
          }`}
        >

          {children}{/* this is where dashboard will render */}
        </main>
      </div>
    </div>
  );
}

export default layout;
