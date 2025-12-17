import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import useUserRole from "../hooks/useUserRole";

const UserDashboardLayout = () => {
  const { role, loading } = useUserRole();



  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!role || role === "none") return <p className="text-center mt-10">Access Denied</p>;

  const menuItems = {
    user: [
      { name: "My Profile", path: "profile" },
      { name: "My Orders", path: "orders" },
      { name: "My Reviews", path: "reviews" },
      { name: "Favorite Meals", path: "favorites" },
      { name: "Payment Success", path: "payment-success" },
    ],
    chef: [
      { name: "Chef Profile", path: "chef/my-profile" },
      { name: "Create Meal", path: "chef/create-meal" },
      { name: "My Meals", path: "chef/my-meals" },
      { name: "Order Requests", path: "chef/order-requests" },
    ],
    admin: [
      { name: "Admin Profile", path: "admin/profile" },
      { name: "Manage Users", path: "admin/manage-users" },
      { name: "Manage Requests", path: "admin/manage-requests" },
      { name: "Platform Statistics", path: "admin/statistics" },
    ],
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md p-6">
        <h2 className="text-2xl font-bold text-[#8D0B41] mb-6 text-center">
          {role.charAt(0).toUpperCase() + role.slice(1)} Dashboard
       </h2>
        <nav className="space-y-4">
      {menuItems[role].map(item => (
            <NavLink
          key={item.path}
              to={`/dashboard/${item.path}`}        
              className={({ isActive }) =>
                `block p-2 rounded ${isActive ? "bg-[#8D0B41] text-white" : "text-gray-700"}`
              }
            >
              {item.name}
       </NavLink>
      ))}
        </nav>
      </aside>

      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default UserDashboardLayout;
