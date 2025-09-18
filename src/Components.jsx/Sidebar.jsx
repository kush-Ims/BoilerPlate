import React from "react";
import { Link } from "react-router-dom";
import {
  Home,
  Users,
  Calendar,
  BarChart2,
} from "lucide-react";

function Sidebar({ collapsed, onToggleSidebar }) {
  return (
    <div
      className={`${
        collapsed ? "w-18" : "w-64"
      } h-screen bg-gradient-to-b from-[#272523] to-[#272523] p-4 z-10 shadow-lg transition-all duration-500 fixed`}
    >
      <ul className="space-y-1">
        <li>
          <Link
            to="/dashboard"
            className="flex items-center gap-3 text-white hover:bg-[#FFD369]/70 p-2 rounded cursor-pointer"
          >
            <Home className="h-5 w-5 flex-shrink-0" />
            {!collapsed && <span>Dashboard</span>}
          </Link>
        </li>

        <li>
          <Link
            to="/patients"
            className="flex items-center gap-3 text-white hover:bg-[#FFD369]/70 p-2 rounded cursor-pointer"
          >
            <Users className="h-5 w-5 flex-shrink-0" />
            {!collapsed && <span>Patients</span>}
          </Link>
        </li>

        <li>
          <div className="flex items-center gap-3 text-white hover:bg-[#FFD369]/70 p-2 rounded cursor-pointer">
            <Calendar className="h-5 w-5 flex-shrink-0" />
            {!collapsed && <span>Appointments</span>}
          </div>
        </li>

        <li>
          <div className="flex items-center gap-3 text-white hover:bg-[#FFD369]/70 p-2 rounded cursor-pointer">
            <Calendar className="h-5 w-5 flex-shrink-0" />
            {!collapsed && <span>Forms</span>}
          </div>
        </li>

        <li>
          <div className="flex items-center gap-3 text-white hover:bg-[#FFD369]/70 p-2 rounded cursor-pointer">
            <BarChart2 className="h-5 w-5 flex-shrink-0" />
            {!collapsed && <span>Reports</span>}
          </div>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
