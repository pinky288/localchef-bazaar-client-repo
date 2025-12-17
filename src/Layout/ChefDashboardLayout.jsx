import { NavLink, Outlet } from "react-router-dom";

const ChefDashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">

      <aside className="w-64 bg-[#8D0B41] text-white p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Chef Dashboard</h2>
        <nav className="space-y-3">
          <NavLink
            to="profile"
            className={({ isActive }) =>
              `block px-4 py-2 rounded ${isActive ? "bg-white text-[#8D0B41]" : "hover:bg-[#FF5C8D]"}`
            }
          >
            My Profile
          </NavLink>
          <NavLink
            to="create-meal"
            className={({ isActive }) =>
              `block px-4 py-2 rounded ${isActive ? "bg-white text-[#8D0B41]" : "hover:bg-[#FF5C8D]"}`
           }
          >
            Create Meal
          </NavLink>
          <NavLink
            to="my-meals"
            className={({ isActive }) =>
              `block px-4 py-2 rounded ${isActive ? "bg-white text-[#8D0B41]" : "hover:bg-[#FF5C8D]"}`
            }
          >
            My Meals
          </NavLink>
          <NavLink
            to="order-requests"
            className={({ isActive }) =>
              `block px-4 py-2 rounded ${isActive ? "bg-white text-[#8D0B41]" : "hover:bg-[#FF5C8D]"}`
            }
          >
            Order Requests
          </NavLink>
        </nav>
      </aside>

   
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default ChefDashboardLayout;
