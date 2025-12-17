import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { auth } from "../firebase/firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";

const DashboardLayout = () => {
  const [user] = useAuthState(auth);
  const [role, setRole] = useState(null);
  const [fetchingRole, setFetchingRole] = useState(true);
  const location = useLocation();


  useEffect(() => {
    if (user?.email) {
      setFetchingRole(true);
      fetch(`http://localhost:3000/users/role/${user.email}`, {
        method: "GET",
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => setRole(data.role))
        .catch((err) => console.error(err))
        .finally(() => setFetchingRole(false));
    } else {
      setFetchingRole(false);
    }
  }, [user]);

  useEffect(() => {
    if (!role) return;

    let title = "Dashboard";

    if (role === "user") {
      if (location.pathname.includes("profile")) title = "My Profile | Dashboard";
      else if (location.pathname.includes("orders")) title = "My Orders | Dashboard";
      else if (location.pathname.includes("reviews")) title = "My Reviews | Dashboard";
      else if (location.pathname.includes("favorites")) title = "Favorite Meals | Dashboard";
      else title = "User Dashboard";
    }

    if (role === "chef") {
      if (location.pathname.includes("create-meal")) title = "Create Meal | Dashboard";
      else if (location.pathname.includes("my-meals")) title = "My Meals | Dashboard";
      else if (location.pathname.includes("order-requests")) title = "Order Requests | Dashboard";
      else title = "Chef Dashboard";
    }

    if (role === "admin") {
      if (location.pathname.includes("manage-users")) title = "Manage Users | Dashboard";
      else if (location.pathname.includes("manage-requests")) title = "Manage Requests | Dashboard";
      else if (location.pathname.includes("statistics")) title = "Statistics | Dashboard";
      else title = "Admin Dashboard";
    }

    document.title = title;
  }, [location.pathname, role]);

  if (fetchingRole) return <p className="text-center mt-10">Loading...</p>;
  if (!role) return <p className="text-center mt-10">Error fetching role</p>;

  const menuItems = {
    user: [
      { name: "My Profile", path: "profile" },
      { name: "My Orders", path: "orders" },
      { name: "My Reviews", path: "reviews" },
      { name: "Favorite Meals", path: "favorites" },
    ],
    chef: [
      { name: "Chef Profile", path: "my-profile" },
      { name: "Create Meal", path: "create-meal" },
      { name: "My Meals", path: "my-meals" },
      { name: "Order Requests", path: "order-requests" },
    ],
    admin: [
      { name: "Admin Profile", path: "profile" },
      { name: "Manage Users", path: "manage-users" },
      { name: "Manage Requests", path: "manage-requests" },
      { name: "Platform Statistics", path: "statistics" },
    ],
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
     
      <aside className="w-64 bg-white shadow-md p-6">
        <h2 className="text-2xl font-bold text-[#8D0B41] mb-6 text-center">
          {role.charAt(0).toUpperCase() + role.slice(1)} Dashboard
        </h2>
  <nav className="space-y-3">
          {menuItems[role].map((item) => (
            <NavLink
              key={item.path}
              to={`/dashboard${role === "user" ? "" : `/${role}`}/${item.path}`}
              className={({ isActive }) =>
                `block px-3 py-2 rounded font-medium transition ${
                  isActive
                    ? "bg-[#8D0B41] text-white"
                    : "text-gray-700 hover:bg-gray-200"
                }`
           }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-4 md:p-6">
        <Outlet />
      </main>
    </div>
);
};

export default DashboardLayout;
