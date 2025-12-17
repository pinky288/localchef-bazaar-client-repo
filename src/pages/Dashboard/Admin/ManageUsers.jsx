import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Manage Users | Admin";
  }, []);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3000/users", { withCredentials: true });
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to fetch users.", "error");
    } finally {
      setLoading(false);
    }
  };

  const makeFraud = async (userId) => {
    const confirmResult = await Swal.fire({
      title: "Are you sure?",
      text: "This user will be marked as fraud!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, mark as fraud",
      cancelButtonText: "Cancel",
    });

    if (!confirmResult.isConfirmed) return;

    try {
      await axios.put(
        `http://localhost:3000/users/role/${userId}`,
        { role: "fraud" },
        { withCredentials: true }
      );

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, role: "fraud", status: "fraud" } : user
        )
      );

      Swal.fire("Updated!", "User marked as fraud.", "success");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to update user.", "error");
    }
  };

  if (loading) return <p className="text-center mt-10 text-lg">Loading users...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-[#8D0B41] mb-6">Manage Users</h1>

     
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg divide-y divide-gray-200">
          <thead className="bg-[#8D0B41] text-white">
            <tr>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Role</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50 text-sm md:text-base">
                <td className="py-2 px-4">{user.name}</td>
                <td className="py-2 px-4">{user.email}</td>
                <td className="py-2 px-4 capitalize">{user.role}</td>
                <td className="py-2 px-4 capitalize">{user.status || "active"}</td>
                <td className="py-2 px-4">
                  {user.role !== "admin" && user.status !== "fraud" ? (
                    <button
                      onClick={() => makeFraud(user._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition-colors"
                    >
                      Make Fraud
                    </button>
                  ) : (
                    <button
                      disabled
                      className="bg-gray-400 text-white px-3 py-1 rounded cursor-not-allowed"
                    >
                      Disabled
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden space-y-4">
        {users.length === 0 && (
          <p className="text-center text-gray-500">No users found.</p>
        )}
        {users.map((user) => (
          <div key={user._id} className="bg-white shadow-md rounded-lg p-4">
            <p className="font-semibold">{user.name}</p>
            <p className="text-sm text-gray-600">{user.email}</p>
            <p className="capitalize">Role: {user.role}</p>
            <p className="capitalize">Status: {user.status || "active"}</p>
            <div className="mt-2">
              {user.role !== "admin" && user.status !== "fraud" ? (
                <button
                  onClick={() => makeFraud(user._id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded w-full"
                >
                  Make Fraud
                </button>
              ) : (
                <button
                  disabled
                  className="bg-gray-400 text-white px-3 py-1 rounded w-full cursor-not-allowed"
                >
                  Disabled
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageUsers;
