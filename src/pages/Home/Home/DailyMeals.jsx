import React, { useEffect, useState } from "react";

const DailyMeals = () => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    async function fetchMeals() {
      try {
        const res = await fetch("http://localhost:3000/meals");
        const data = await res.json();
        setMeals(data.slice(0, 6).reverse()); 
      } catch (err) {
        console.error("Failed to fetch meals:", err);
      }
    }
    fetchMeals();
  }, []);

  return (
    <div className="my-20 px-10"> 
    <h2 className="text-3xl font-bold text-center mb-2 text-[#8D0B41]"> Today’s Special Meals 
        </h2> 
        <p className="text-center text-gray-700 mb-9"> Discover our chef-curated daily meals crafted with fresh, <br /> high-quality ingredients.Enjoy delicious, wholesome dishes delivered <br />fast to your doorstep every single day. </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {meals.map((meal) => (
          <div key={meal._id} className="border rounded-lg shadow-lg p-4 hover:shadow-2xl transition">
            <img
              src={meal.image}
              alt={meal.name}
              className="w-full h-48 object-cover rounded"
            />
            <h3 className="text-xl font-semibold mt-3 text-[#8D0B41]">{meal.name}</h3>
            <p className="text-gray-700">{meal.chef}</p>
            <p className="text-gray-700">{meal.category}</p>
            <p className="text-lg font-bold text-[#8D0B41]">৳ {meal.price}</p>
            <button className="mt-3 w-full bg-[#8D0B41] text-white py-2 rounded font-semibold hover:bg-[#6F0832] transition">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyMeals;
