import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const ManageRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Admin | Manage Requests";
  }, []);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await axios.get("http://localhost:3000/role-requests", { withCredentials: true });
      setRequests(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to fetch requests.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (id, action) => {
    try {
      const confirm = await Swal.fire({
        title: `Are you sure?`,
        text: `You are about to ${action} this request.`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "Cancel",
      });
      if (!confirm.isConfirmed) return;

      await axios.patch(
        `http://localhost:3000/role-request/${id}`,
        { action },
        { withCredentials: true }
      );
      Swal.fire("Success!", `Request ${action}ed successfully.`, "success");
      fetchRequests();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to process request.", "error");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-[#8D0B41] mb-6">Manage Requests</h1>

   
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg divide-y divide-gray-200">
          <thead className="bg-[#8D0B41] text-white">
            <tr>
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Email</th>
              <th className="py-2 px-4 text-left">Request Type</th>
              <th className="py-2 px-4 text-left">Status</th>
              <th className="py-2 px-4 text-left">Time</th>
              <th className="py-2 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {requests.map((req) => (
              <tr key={req._id} className="text-sm md:text-base text-center hover:bg-gray-50">
                <td className="py-2 px-4">{req.userName}</td>
                <td className="py-2 px-4">{req.userEmail}</td>
                <td className="py-2 px-4 capitalize">{req.requestType}</td>
                <td className="py-2 px-4">{req.requestStatus}</td>
                <td className="py-2 px-4">{new Date(req.requestTime).toLocaleString()}</td>
                <td className="py-2 space-x-2">
                  {req.requestStatus === "pending" ? (
                    <>
                      <button
                        onClick={() => handleAction(req._id, "accept")}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleAction(req._id, "reject")}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                      >
                        Reject
                      </button>
                    </>
                  ) : (
                    <button disabled className="bg-gray-400 text-white px-3 py-1 rounded cursor-not-allowed">
                      Done
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="md:hidden space-y-4">
        {requests.length === 0 && <p className="text-center text-gray-500">No requests found.</p>}
        {requests.map((req) => (
          <div key={req._id} className="bg-white shadow-md rounded-lg p-4">
            <p className="font-semibold">{req.userName}</p>
            <p className="text-sm text-gray-600">{req.userEmail}</p>
            <p className="capitalize">Type: {req.requestType}</p>
            <p className="capitalize">Status: {req.requestStatus}</p>
            <p className="text-sm text-gray-500">{new Date(req.requestTime).toLocaleString()}</p>
            <div className="mt-2 space-x-2 flex flex-col sm:flex-row">
              {req.requestStatus === "pending" ? (
                <>
                  <button
                    onClick={() => handleAction(req._id, "accept")}
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded w-full sm:w-auto"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleAction(req._id, "reject")}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded w-full sm:w-auto"
                  >
                    Reject
                  </button>
                </>
              ) : (
                <button
                  disabled
                  className="bg-gray-400 text-white px-3 py-1 rounded w-full cursor-not-allowed"
                >
                  Done
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageRequests;
