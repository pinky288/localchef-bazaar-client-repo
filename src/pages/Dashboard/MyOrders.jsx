import React, { useEffect, useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import Swal from "sweetalert2";
import axios from "axios";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [payingOrderId, setPayingOrderId] = useState(null);

  
  useEffect(() => {
    document.title = "My Orders | Your App Name";
  }, []);

  
  const fetchOrders = async () => {
    try {
      const res = await fetch("http://localhost:3000/orders");
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to fetch orders", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

 
  const handleDelete = async (orderId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this order?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(`http://localhost:3000/orders/${orderId}`, {
          method: "DELETE",
        });
        if (res.ok) {
          setOrders(orders.filter((o) => o._id !== orderId));
          Swal.fire("Deleted!", "Your order has been deleted.", "success");
        } else {
          Swal.fire("Error!", "Failed to delete order.", "error");
        }
      } catch (err) {
        console.error(err);
        Swal.fire("Error!", "Server error occurred.", "error");
      }
    }
  };

 
  const handlePayment = async (order) => {
    try {
      setPayingOrderId(order._id);

      const res = await axios.post("http://localhost:3000/create-checkout-session", {
        mealName: order.mealName,
        price: order.price,
        orderId: order._id, 
      });

      window.location.href = res.data.url;
    } catch (err) {
      console.error(err);
      Swal.fire("Payment Error", "Something went wrong!", "error");
    } finally {
      setPayingOrderId(null);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading orders...</p>;
  if (orders.length === 0) return <p className="text-center mt-10">No orders found.</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6 text-center text-[#8D0B41]">My Orders</h2>
      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white p-4 sm:p-6 rounded-lg shadow-md border border-gray-200 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3"
          >
            <div className="flex-1">
              <h3 className="font-bold text-lg mb-2">{order.mealName}</h3>
              <p><strong>Quantity:</strong> {order.quantity}</p>
              <p><strong>Price:</strong> ৳{order.price}</p>
              <p><strong>Status:</strong> {order.orderStatus}</p>
              <p><strong>Payment Status:</strong> {order.paymentStatus}</p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-2 sm:mt-0">
              <button
                onClick={() => handleDelete(order._id)}
                className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-100 transition-colors"
                title="Delete Order"
              >
                <FiTrash2 size={20} />
              </button>

              {order.paymentStatus === "Pending" && (
                <button
                  onClick={() => handlePayment(order)}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  {payingOrderId === order._id ? "Processing..." : "Pay Now"}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
