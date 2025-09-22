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
            to="/usermaster"
            className="flex items-center gap-3 text-white hover:bg-[#FFD369]/70 p-2 rounded cursor-pointer"
          >
            <Users className="h-5 w-5 flex-shrink-0" />
            {!collapsed && <span>Base Master for user</span>}
          </Link>
        </li>

      </ul>
    </div>
  );
}

export default Sidebar;
