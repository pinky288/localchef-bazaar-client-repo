import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase.config";
import { onAuthStateChanged } from "firebase/auth";
import Swal from "sweetalert2";

const MealDetails = () => {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      if (!u) {
        navigate("/login");
      } else {
        setUser({
          name: u.displayName || "Anonymous",
          email: u.email,
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
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMeal();
  }, [id]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch("http://localhost:3000/reviews");
        const data = await res.json();
        setReviews(data.filter((r) => r.foodId === id));
      } catch (err) {
        console.error(err);
      }
    };
    fetchReviews();
  }, [id]);

  if (loading) return <p className="text-center mt-20">Loading meal details...</p>;
  if (!meal) return <p className="text-center mt-20">Meal not found.</p>;
  if (!user) return <p className="text-center mt-20">Checking user authentication...</p>;

  const handleAddReview = async (e) => {
    e.preventDefault();
    const newReview = {
      foodId: meal._id,
      reviewerName: user.name || "Anonymous",
      reviewerImage: user.image || "https://i.ibb.co/sample-user.jpg",
      rating,
      comment,
      date: new Date().toISOString(),
    };

    try {
      const res = await fetch("http://localhost:3000/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newReview),
      });
      if (res.ok) {
        Swal.fire("Success!", "Review submitted successfully!", "success");
        setReviews((prev) => [newReview, ...prev]);
        setComment("");
        setRating(5);
      } else {
        Swal.fire("Error!", "Failed to submit review.", "error");
      }
    } catch {
      Swal.fire("Error!", "Server error occurred.", "error");
    }
  };

  const handleAddFavorite = async () => {
    if (!user?.email) {
      Swal.fire("Error", "You must be logged in to add favorite.", "error");
      return;
    }

    const favoriteData = {
      userEmail: user.email,
      mealId: meal._id,
      mealName: meal.name,
      chefId: meal.chefId,
      chefName: meal.chef,
      price: meal.price,
      image: meal.image,
    };

    try {
      const res = await fetch("http://localhost:3000/favorites");
      const data = await res.json();
      const alreadyAdded = data.find(f => f.userEmail === user.email && f.mealId === meal._id);

      if (alreadyAdded) {
        Swal.fire("Info", "Meal already in favorites.", "info");
        return;
      }

      const addRes = await fetch("http://localhost:3000/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(favoriteData),
      });

      if (addRes.ok) {
        Swal.fire("Success!", "Meal added to favorites!", "success");
      } else {
        Swal.fire("Error!", "Failed to add favorite.", "error");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error!", "Server error occurred.", "error");
    }
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <img src={meal.image} alt={meal.name} className="w-full rounded-lg shadow-lg" />
        </div>
      <div className="md:w-1/2 flex flex-col gap-3">
       <h1 className="text-3xl font-bold text-[#8D0B41]">{meal.name}</h1>
          <p><span className="font-semibold">Chef:</span> {meal.chef} ({meal.chefId})</p>
        <p><span className="font-semibold">Category:</span> {meal.category}</p>
          <p><span className="font-semibold">Price:</span> ৳ {meal.price}</p>
          <p><span className="font-semibold">Rating:</span> {meal.rating} ⭐</p>
          <p><span className="font-semibold">Ingredients:</span> {meal.ingredients.join(", ")}</p>
          <p><span className="font-semibold">Delivery Area:</span> {meal.deliveryArea}</p>
          <p><span className="font-semibold">Estimated Delivery Time:</span> {meal.estimatedDeliveryTime}</p>
          <p><span className="font-semibold">Chef’s Experience:</span> {meal.chefExperience}</p>

          <div className="flex gap-3 mt-4">
        <button onClick={() => navigate(`/order/${meal._id}`)} className="bg-[#8D0B41] text-white py-2 px-4 rounded hover:bg-[#6F0832] w-40">Order Now</button>
            <button onClick={handleAddFavorite} className="bg-white text-[#8D0B41] py-2 px-4 rounded hover:bg-yellow-600 w-40 shadow-sm">Add to Favorite</button>
       </div>
        </div>
   </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold text-[#8D0B41] mb-3">Reviews</h2>
     <form onSubmit={handleAddReview} className="flex flex-col gap-3 mb-6 max-w-md">
          <label>Name:
        <input type="text" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} className="border px-2 py-1 rounded w-full" />
          </label>
          <label>Image URL:
            <input type="text" value={user.image} onChange={(e) => setUser({ ...user, image: e.target.value })} className="border px-2 py-1 rounded w-full" placeholder="Enter image URL (optional)" />
          </label>
       <label>Rating:
            <select value={rating} onChange={(e) => setRating(Number(e.target.value))} className="border px-2 py-1 rounded w-full">
             {[5,4,3,2,1].map((r) => <option key={r} value={r}>{r} ⭐</option>)}
            </select>
        </label>
          <label>Comment:
            <textarea value={comment} onChange={(e) => setComment(e.target.value)} required className="border px-2 py-1 rounded w-full" placeholder="Write your review" />
          </label>
          <button type="submit" className="bg-[#8D0B41] text-white py-2 px-4 rounded w-40 hover:bg-[#6F0832]">Submit Review</button>
        </form>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reviews.map((r, idx) => (
      <div key={idx} className="border rounded-lg p-3 shadow hover:shadow-lg flex items-center gap-3">
              <img src={r.reviewerImage || "https://i.ibb.co/sample-user.jpg"} alt={r.reviewerName} className="w-12 h-12 rounded-full object-cover border-2 border-[#8D0B41]" />
           <div>
                <p className="font-semibold text-[#8D0B41]">{r.reviewerName}</p>
             <p className="text-yellow-500 my-1">{"★".repeat(r.rating) + "☆".repeat(5 - r.rating)}</p>
                <p className="text-gray-700 text-sm">{r.comment}</p>
                <p className="text-gray-400 text-xs">{new Date(r.date).toLocaleString()}</p>
              </div>
    </div>
       ))}
        </div>
     </div>
    </div>
  );
};

export default MealDetails;
