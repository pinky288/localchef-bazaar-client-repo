import { Link, Outlet } from "react-router-dom";
import useUserRole from "../../hooks/useUserRole";

const AdminDashboardLayout = () => {
  const role = useUserRole();

  if (!role) return <p className="text-center mt-10">Loading...</p>;
  if (role !== "admin") return <p className="text-center mt-10">Access Denied</p>;

  return (
    <div className="flex min-h-screen">
     
 <div className="w-64 bg-[#8D0B41] text-white p-5">
        <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
        <ul className="space-y-4 font-semibold">
          <li><Link to="profile" className="hover:text-gray-300">Admin Profile</Link></li>
          <li><Link to="manage-users" className="hover:text-gray-300">Manage Users</Link></li>
          <li><Link to="manage-requests" className="hover:text-gray-300">Manage Requests</Link></li>
          <li><Link to="statistics" className="hover:text-gray-300">Platform Statistics</Link></li>
        </ul>
      </div>

    
      <div className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </div>
    </div>
   );
};

export default AdminDashboardLayout;
