import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Meals = () => {
  const [meals, setMeals] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Meals | LocalChef";
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/meals")
      .then((res) => res.json())
      .then((data) => setMeals(data))
      .catch((err) => console.log(err));
  }, []);

  
  const handleSort = () => {
    const sortedMeals = [...meals].sort((a, b) => {
      if (sortOrder === "asc") return a.price - b.price;
      else return b.price - a.price;
    });
    setMeals(sortedMeals);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleSeeDetails = (id) => {
    navigate(`/meal/${id}`);
  };

  
  const indexOfLastMeal = currentPage * itemsPerPage;
  const indexOfFirstMeal = indexOfLastMeal - itemsPerPage;
  const currentMeals = meals.slice(indexOfFirstMeal, indexOfLastMeal);
  const totalPages = Math.ceil(meals.length / itemsPerPage);

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-[#8D0B41]">Daily Meals</h1>
        <p className="text-gray-700 mt-2">
          Discover our chef-curated daily meals crafted with fresh, high-quality <br />
          ingredients. Enjoy delicious, wholesome dishes delivered fast.
        </p>
      </div>

      
      <div className="flex justify-end mb-6">
        <button
          onClick={handleSort}
          className="bg-[#8D0B41] text-white px-4 py-2 rounded hover:bg-[#6F0832] transition"
        >
          Sort by Price ({sortOrder === "asc" ? "Ascending" : "Descending"})
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentMeals.map((meal) => (
          <div
            key={meal._id}
            className="border rounded-xl shadow-md hover:shadow-xl transition p-4 flex flex-col"
          >
            <img
              src={meal.image}
              alt={meal.name}
              className="w-full h-48 object-cover rounded-lg mb-3"
            />
            <h2 className="text-xl font-semibold text-[#8D0B41]">{meal.name}</h2>
            <p className="text-gray-700 mt-1">
            Chef:{" "}
              <span className="font-semibold text-[#8D0B41]">
               {meal.chef}
              </span>
          </p>
            <p className="text-gray-700">{meal.category}</p>
            <p className="text-lg font-bold text-[#8D0B41]">৳ {meal.price}</p>
            <p>
              Rating:{" "}
            <span className="font-semibold text-[#8D0B41]">
                {meal.rating} ⭐
           </span>
            </p>
            <p>
              Delivery Area:{" "}
              <span className="font-semibold text-[#8D0B41]">
                {meal.deliveryArea}
              </span>
            </p>
 <button
              onClick={() => handleSeeDetails(meal._id)}
              className="mt-3 w-full bg-[#8D0B41] text-white py-2 rounded font-semibold hover:bg-[#6F0832] transition"
            >
              See Details
            </button>
          </div>
        ))}
      </div>

   <div className="flex justify-center mt-10 gap-2">
        {[...Array(totalPages).keys()].map((number) => (
          <button
            key={number}
            onClick={() => setCurrentPage(number + 1)}
            className={`px-4 py-2 rounded ${
              currentPage === number + 1
                ? "bg-[#8D0B41] text-white"
                : "bg-gray-200"
            }`}
          >
            {number + 1}
     </button>
   ))}
      </div>
    </div>
 );
};

export default Meals;
