"use client";
import Sidebar from "@/components/dashboard/sidebar/sidebar";
import Navbar from "@/components/dashboard/navbar/navbar";
import React, { ReactNode, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi"; // Import hamburger and close icons

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen">
      {/* Hamburger icon for smaller screens */}
      <div className="md:hidden">
        {isSidebarOpen ? (
          <FiX
            className="text-2xl text-gray-800 cursor-pointer"
            onClick={toggleSidebar}
          />
        ) : (
          <FiMenu
            className="text-2xl text-gray-800 cursor-pointer mar"
            onClick={toggleSidebar}
          />
        )}
      </div>

      {/* Sidebar */}
      <div className={`w-64 ${isSidebarOpen ? "block" : "hidden"} md:block`}>
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex-[4] p-2">
        <Navbar />
        {children}
      </div>
    </div>
  );
};

export default Layout;
