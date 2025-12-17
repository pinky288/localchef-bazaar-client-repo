import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase.config";
import { onAuthStateChanged } from "firebase/auth";
import Swal from "sweetalert2";

const OrderPage = () => {
  const { id } = useParams(); 
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [address, setAddress] = useState("");
  const [user, setUser] = useState({ email: "", name: "", image: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      if (!u) {
        navigate("/login");
      } else {
        setUser({
          email: u.email,
          name: u.displayName || "Anonymous",
          image: u.photoURL || "https://i.ibb.co/sample-user.jpg",
        });
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    const fetchMeal = async () => {
      try {
        const res = await fetch("http://localhost:3000/meals");
        const data = await res.json();
        const selectedMeal = data.find((m) => m._id === id);
        setMeal(selectedMeal || null);

        if (selectedMeal) {
          document.title = `Order | ${selectedMeal.name}`;
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMeal();
  }, [id]);

  if (loading) return <p className="text-center mt-20">Loading order...</p>;
  if (!meal) return <p className="text-center mt-20">Meal not found.</p>;

  const handleConfirmOrder = async (e) => {
    e.preventDefault();
    const totalPrice = meal.price * quantity;

    const summaryHtml = `
      <div style="text-align:left; font-family: Arial, sans-serif;">
        <p><strong>Meal:</strong> ${meal.name}</p>
        <p><strong>Unit Price:</strong> ৳${meal.price}</p>
        <p><strong>Quantity:</strong> ${quantity}</p>
        <p><strong>Delivery Address:</strong> ${address}</p>
        <hr>
        <p><strong>Total Price:</strong> ৳${totalPrice}</p>
      </div>
    `;

    const result = await Swal.fire({
      title: "Order Summary",
      html: summaryHtml,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Confirm Order",
      cancelButtonText: "Cancel",
      width: 450,
    });

    if (result.isConfirmed) {
      const orderData = {
        foodId: meal._id,
        mealName: meal.name,
        price: meal.price,
        quantity,
        chefId: meal.chefId,
        paymentStatus: "Pending",
        userEmail: user.email,
        userName: user.name,
        userAddress: address,
        orderStatus: "pending",
        orderTime: new Date().toISOString(),
      };

      try {
        const res = await fetch("http://localhost:3000/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderData),
        });

        if (res.ok) {
          Swal.fire("Success!", "Order placed successfully!", "success");
          navigate("/"); 
        } else {
          Swal.fire("Error!", "Failed to place order.", "error");
        }
      } catch (err) {
        console.error(err);
        Swal.fire("Error!", "Server error occurred.", "error");
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row gap-8">
       
        <div className="md:w-1/2">
          <img src={meal.image} alt={meal.name} className="w-full rounded-lg shadow-lg" />
        </div>

        <div className="md:w-1/2 flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-[#8D0B41] mb-4">{meal.name}</h1>

          <form onSubmit={handleConfirmOrder} className="flex flex-col gap-3">
            <label>
              Price:
              <input
                type="text"
                value={meal.price}
                disabled
                className="border px-2 py-1 w-full rounded"
              />
            </label>

            <label>
              Quantity:
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="border px-2 py-1 w-full rounded"
              />
            </label>

            <label>
              Delivery Address:
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                className="border px-2 py-1 w-full rounded"
                placeholder="Enter your delivery address"
              />
            </label>

            <label>
              User Email:
              <input
                type="email"
                value={user.email}
                disabled
                className="border px-2 py-1 w-full rounded"
              />
            </label>

            <label>
              User Name:
              <input
                type="text"
                value={user.name}
                disabled
                className="border px-2 py-1 w-full rounded"
              />
            </label>

            <label>
              Chef ID:
              <input
                type="text"
                value={meal.chefId}
                disabled
                className="border px-2 py-1 w-full rounded"
              />
            </label>

            <button
              type="submit"
              className="mt-4 bg-[#8D0B41] text-white py-2 px-4 rounded hover:bg-[#6F0832] w-40"
            >
              Confirm Order
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
