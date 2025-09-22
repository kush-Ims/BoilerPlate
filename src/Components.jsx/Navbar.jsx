import React, { useState } from 'react';
import {
  Menu,
  Search,
  Bell,
  UserCircle,
  LogOut,
  MessageSquare,
  UserPlus,
  AlertTriangle,
  Eye
} from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";

function Navbar({ onToggleSidebar }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const navigate = useNavigate();

const handlelogout = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("userInfo");
  navigate("/");
};

  const notifications = [
    { id: 1, text: "New comment on your post", icon: <MessageSquare className="h-5 w-5" /> },
    { id: 2, text: "3 new followers", icon: <UserPlus className="h-5 w-5" /> },
    { id: 3, text: "Server maintenance at 10 PM", icon: <AlertTriangle className="h-5 w-5" /> },
    { id: 5, text: "Someone viewed your profile", icon: <Eye className="h-5 w-5" /> },
  ];

  return (
    <nav className="flex items-center justify-between shadow-lg px-4 py-2 bg-gray-100 relative z-20 sticky top-0 ">
      {/* Left - Logo and menu */}
      <div className="flex items-center space-x-2">
        <Menu
          className="h-6 w-8 text-black mr-3 cursor-pointer"
          onClick={onToggleSidebar}
        />
        <h3 className="text-lg text-black font-bold">Base Boiler Plate</h3>
      </div>

      {/* Right side */}
      <div className="flex items-center space-x-4 relative">
        {/* Search Bar */}
        <div className="flex items-center w-full max-w-md px-4">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search..."
              className="w-full text-black pl-10 pr-4 py-1.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
          </div>
        </div>

        {/* Notifications */}
        <div className="relative">
          <Bell
            className="h-6 w-8 text-black cursor-pointer"
            onClick={() => {
              setNotificationOpen(!notificationOpen);
              setDropdownOpen(false);
            }}
          />
          <AnimatePresence>
            {notificationOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg z-50 border"
              >
                <div className="max-h-60 overflow-y-auto">
                  <ul className="py-2 text-black text-md">
                    {notifications.map((n) => (
                      <li
                        key={n.id}
                        className="px-4 py-2 hover:bg-[#FFD369]/70 cursor-pointer flex items-center space-x-2"
                      >
                        <span className="text-blue-500">{n.icon}</span>
                        <span>{n.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="px-4 py-2 text-center text-blue-500 text-sm border-thover:bg-[#FFD369]/70 cursor-pointer">
                  View all notifications
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Profile Dropdown */}
        <div className="relative">
          <UserCircle
            className="h-6 w-8 text-black cursor-pointer"
            onClick={() => {
              setDropdownOpen(!dropdownOpen);
              setNotificationOpen(false);
            }}
          />
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-50">
              <ul className="py-2">
                <li className="px-4 py-2 hover:bg-[#FFD369]/70 text-black cursor-pointer flex items-center space-x-2">
                  <UserCircle className="h-5 w-5" />
                  <span>Profile</span>
                </li>
                <li
                  className="px-4 py-2 hover:bg-[#FFD369]/70 text-black cursor-pointer flex items-center space-x-2"
                  onClick={handlelogout}
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
