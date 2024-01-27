import Sidebar from "@/components/dashboard/sidebar/sidebar";
import Navbar from "@/components/dashboard/navbar/navbar";
import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex">
      <div className="w-64">
        <Sidebar />
      </div>
      <div className="flex-[4] p-2">
        <Navbar />
        {children}
      </div>
    </div>
  );
};

export default layout;
