import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

const OrderRequests = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

 
  useEffect(() => {
    document.title = "Order Requests | Dashboard";
  }, []);

 
  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:3000/orders", {
        withCredentials: true, 
      });
      setOrders(res.data);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to fetch orders", "error");
    } finally {
      setLoading(false);
    }
  };

  
  const handleStatus = async (orderId, status) => {
    try {
      await axios.patch(
        `http://localhost:3000/orders/${orderId}/status`,
        { orderStatus: status },
        { withCredentials: true }
      );
      Swal.fire("Success", `Order ${status}`, "success");
      fetchOrders(); // refresh orders
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to update order status", "error");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading orders...</p>;
  if (orders.length === 0)
    return <p className="text-center mt-10 text-gray-500">No orders found</p>;

  return (
    <div className="p-4 space-y-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center text-[#8D0B41]">
        Order Requests
      </h2>

      {orders.map((order) => (
        <div
          key={order._id}
          className="bg-white p-4 rounded-lg shadow-md flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3"
        >
          <div className="space-y-1">
            <p>
              <strong>Meal:</strong> {order.mealName}
            </p>
            <p>
              <strong>User:</strong> {order.userEmail}
            </p>
            <p>
              <strong>Quantity:</strong> {order.quantity}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span className="capitalize">{order.orderStatus}</span>
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
            <button
              onClick={() => handleStatus(order._id, "accepted")}
              className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
              disabled={order.orderStatus !== "pending"}
            >
              Accept
            </button>

            <button
              onClick={() => handleStatus(order._id, "delivered")}
              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
              disabled={order.orderStatus !== "accepted"}
            >
              Deliver
            </button>

            <button
              onClick={() => handleStatus(order._id, "rejected")}
              className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
              disabled={order.orderStatus !== "pending"}
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderRequests;
