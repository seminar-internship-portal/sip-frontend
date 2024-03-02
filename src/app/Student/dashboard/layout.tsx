// layout.tsx
"use client";
// import Sidebar from "@/components/dashboard/sidebar/sidebar";
import Sidebar from "@/components/dashboard/sidebar/studentside";
import Navbar from "@/components/dashboard/navbar/navbar";
import React, { ReactNode, useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const user = getCookie("Student");
    if (!user) {
      // If there is no user data, redirect to the login page
      router.push("/login");
    } else {
      if (isSidebarOpen) {
        document.documentElement.classList.add("overflow-hidden");
        document.body.classList.add("overflow-hidden");
      } else {
        document.documentElement.classList.remove("overflow-hidden");
        document.body.classList.remove("overflow-hidden");
      }
    }
  }, [isSidebarOpen, router]);

  // Return null if there is no user data
  // if (!getCookie("user")) {
  //   return null;
  // }

  return (
    <div className="flex h-screen">
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

      <div className={`w-64 ${isSidebarOpen ? "block" : "hidden"} md:block`}>
        {/* Assuming Sidebar is properly implemented and rendered */}
        <Sidebar />
      </div>

      <div className="flex-[4] p-2 overflow-y-auto">
        {/* Assuming Navbar is properly implemented and rendered */}
        <Navbar />
        {children}
      </div>
    </div>
  );
};

export default Layout;
