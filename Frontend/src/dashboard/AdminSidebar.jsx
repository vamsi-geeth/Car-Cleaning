import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
      localStorage.removeItem("isLoggedIn"); // 👈 REQUIRED to ensure user is logged out
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    
    navigate("/login");
  };
  return (
    <aside className="w-64 bg-black p-6 min-h-screen">
      <div className="flex items-center mb-10">
        <img src={logo} alt="Logo" style={{ height: '140px' }} className="h-10" />
      </div>
      <nav className="space-y-4 text-sm">
        <Link to="/dashboard/AdminDashboard" className="block hover:text-[#FFD700]">
          Dashboard
        </Link>
        {/* <Link to="/admin-added-items" className="block hover:text-[#FFD700]">
          Added Items
        </Link> */}
        <Link to="/dashboard/Customers" className="block hover:text-[#FFD700]">
          Customers
        </Link>
        <Link to="/dashboard/Leads" className="block hover:text-[#FFD700]">
          Leads
        </Link>
        <Link to="/dashboard/allOrders" className="block hover:text-[#FFD700]">
          Orders
        </Link>
        {/* <Link to="/dashboard/Faq" className="block hover:text-[#FFD700]">
          FAQ's
        </Link> */}
       
        <button className="block hover:text-[#FFD700]" onClick={handleLogout}>
          Logout
        </button>
        {/* <Link to="/login" className="block hover:text-[#FFD700]" >
          Logout
        </Link> */}
      </nav>
    </aside>
  );
};

export default AdminSidebar;
