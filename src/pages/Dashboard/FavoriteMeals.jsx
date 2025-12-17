import React, { useEffect, useState } from "react";
import { auth } from "../../firebase/firebase.config";

const FavoriteMeals = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    document.title = "My Favorite Meals | Your App Name";
  }, []);

  useEffect(() => {
    const fetchFavorites = async () => {
      const userEmail = auth.currentUser?.email;
      if (!userEmail) return;

      try {
        const res = await fetch(`http://localhost:3000/favorites?userEmail=${userEmail}`);
        const data = await res.json();
        setFavorites(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading favorite meals...</p>;
  if (favorites.length === 0) return <p className="text-center mt-10">No favorite meals found.</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6 text-center text-[#8D0B41]">My Favorite Meals</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {favorites.map((meal) => (
          <div
            key={meal.mealId}
            className="bg-white p-4 rounded-lg shadow flex flex-col items-center transition-transform hover:scale-105"
          >
            <img
              src={meal.image}
              alt={meal.mealName}
              className="w-32 h-32 sm:w-36 sm:h-36 object-cover rounded mb-2"
            />
            <h3 className="font-semibold text-lg text-center">{meal.mealName}</h3>
            <p className="text-sm text-gray-600">Chef: {meal.chefName || "Not specified"}</p>
            <p className="font-semibold mt-1">Price: ৳{meal.price || 0}</p>
            <p className="text-xs text-gray-500 mt-1 text-center">
              Added: {meal.addedTime ? new Date(meal.addedTime).toLocaleString() : "-"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoriteMeals;
