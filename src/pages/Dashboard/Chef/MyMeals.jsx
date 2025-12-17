import React, { useEffect, useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import Swal from "sweetalert2";

const MyMeals = () => {
  const [meals, setMeals] = useState([]);

 
  useEffect(() => {
    document.title = "My Meals | Dashboard";
  }, []);

  const fetchMeals = async () => {
    try {
      const res = await fetch("http://localhost:3000/meals");
      const data = await res.json();
      setMeals(data);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to fetch meals", "error");
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this meal?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (confirm.isConfirmed) {
      try {
        await fetch(`http://localhost:3000/meals/${id}`, { method: "DELETE" });
        setMeals(meals.filter((m) => m._id !== id));
        Swal.fire("Deleted", "Meal deleted", "success");
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to delete meal", "error");
      }
    }
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  if (meals.length === 0)
    return <p className="text-center mt-10 text-gray-500">No meals found.</p>;

  return (
    <div className="p-4 space-y-4 max-w-4xl mx-auto">
      {meals.map((meal) => (
        <div
          key={meal._id}
          className="bg-white p-4 rounded-lg shadow-md flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3"
        >
          <div>
            <h3 className="font-bold text-lg">{meal.name}</h3>
            <p className="text-sm text-gray-600">Price: ৳{meal.price}</p>
            <p className="text-sm text-gray-600">Category: {meal.category}</p>
          </div>
          <button
            onClick={() => handleDelete(meal._id)}
            className="text-red-600 hover:text-red-800 self-start sm:self-auto"
            title="Delete Meal"
          >
            <FiTrash2 size={22} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default MyMeals;
