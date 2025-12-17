import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";

const CreateMeal = () => {
  
  useEffect(() => {
    document.title = "Create Meal | Dashboard";
  }, []);

  const [mealData, setMealData] = useState({
    name: "",
    category: "",
    price: "",
    chef: "",
    image: "",
    chefId: "",
    deliveryArea: "",
    estimatedDeliveryTime: "25-35 minutes",
    ingredients: "",
  });

  const handleChange = (e) => {
    setMealData({ ...mealData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3000/meals", mealData);
      Swal.fire("Success", "Meal created successfully!", "success");
      setMealData({
        name: "",
        category: "",
        price: "",
        chef: "",
        image: "",
        chefId: "",
        deliveryArea: "",
        estimatedDeliveryTime: "25-35 minutes",
        ingredients: "",
      });
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to create meal", "error");
    }
  };

  return (
    <div className="p-4 min-h-screen bg-gray-50 flex justify-center">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#8D0B41]">
          Create Meal
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            "name",
            "category",
            "price",
            "chef",
            "image",
            "chefId",
            "deliveryArea",
            "estimatedDeliveryTime",
            "ingredients",
          ].map((field) => (
            <div key={field}>
              <label className="block mb-1 font-semibold capitalize">
                {field.replace(/([A-Z])/g, " $1")}
              </label>
              <input
                type="text"
                name={field}
                value={mealData[field]}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#8D0B41]"
                required
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-full px-4 py-2 bg-[#8D0B41] text-white rounded hover:bg-[#FF5C8D] transition-colors"
          >
            Create Meal
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateMeal;
