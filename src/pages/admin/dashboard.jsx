import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom"; // Import useLocation
import Sidebar from "../../components/sidebar";
import AdminNavbar from "../../components/navbar/admin.navbar";
import { useSelector } from "react-redux";

const DashboardAdmin = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const role = useSelector((state) => state.auth.role);
  const user = useSelector((state) => state.auth.user);
  const location = useLocation(); 

  const isMainPage = location.pathname === "/dashboard"; 

  return (
    <div className="flex h-screen bg-gray-100">
      <div
        className={`transition-all duration-300 ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
        <Sidebar role={role} setIsCollapsed={setIsCollapsed} />
      </div>

      <div className="flex-grow flex flex-col overflow-auto">
        <AdminNavbar role={role} name={user.name}/>
        <div className="p-6">

          {isMainPage && (
            <h1 className="text-2xl font-bold mb-4">Selamat Datang, {role} {user.name}!</h1>
          )}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
