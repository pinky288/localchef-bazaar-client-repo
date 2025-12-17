import { useEffect, useState } from "react";

const App = () => {
  const [categories, setCategories] = useState([]);
  const [chefs, setChefs] = useState([]);
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const catRes = await fetch("http://localhost:3000/categories");
        const catData = await catRes.json();
        setCategories(catData);

        const chefRes = await fetch("http://localhost:3000/chefs");
        const chefData = await chefRes.json();
        setChefs(chefData);

        const mealRes = await fetch("http://localhost:3000/meals");
        const mealData = await mealRes.json();
        setMeals(mealData);
      } catch (err) {
        console.error("Fetch Error:", err);
      }
    }
    fetchData();
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      {/* Categories */}
      <h2>Categories</h2>
      <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
        {categories.map(cat => (
          <div key={cat._id} style={{ textAlign: "center", width: "150px" }}>
            <img src={cat.image} alt={cat.name} style={{ width: "100%", borderRadius: "8px" }} />
            <p>{cat.name}</p>
          </div>
        ))}
      </div>

      {/* Chefs */}
      <h2 style={{ marginTop: "40px" }}>Chefs</h2>
      <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
        {chefs.map(chef => (
          <div key={chef._id} style={{ textAlign: "center", width: "180px", border: "1px solid #ccc", borderRadius: "8px", padding: "10px" }}>
            <img src={chef.image} alt={chef.name} style={{ width: "100%", borderRadius: "8px" }} />
            <h4>{chef.name}</h4>
            <p>{chef.experience}</p>
            <p>{chef.specialty}</p>
          </div>
        ))}
      </div>

      {/* Meals */}
      <h2 style={{ marginTop: "40px" }}>Meals</h2>
      <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
        {meals.map(meal => (
          <div key={meal._id} style={{ width: "200px", border: "1px solid #ccc", borderRadius: "8px", padding: "10px" }}>
            <img src={meal.image} alt={meal.name} style={{ width: "100%", borderRadius: "8px" }} />
            <h4>{meal.name}</h4>
            <p>Chef: {meal.chef}</p>
            <p>Category: {meal.category}</p>
            <p>Price: {meal.price}৳</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
