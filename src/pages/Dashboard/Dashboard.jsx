// src/pages/Dashboard/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { auth } from "../../firebase/firebase.config";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate, Link, Outlet } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true); 
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      const token = localStorage.getItem("accessToken"); 

      if (!currentUser || !token) {
        navigate("/login");
      } else {
        setUser(currentUser);
      }

      setChecking(false); 
    });

    return () => unsubscribe();
  }, [navigate]);

  if (checking) return <p className="text-center mt-10">Loading...</p>;
  if (!user) return null; 
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      
      <div className="w-full md:w-64 bg-[#8D0B41] text-white p-5">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

        <ul className="space-y-4 font-semibold">
          <li>
            <Link
              to="my-profile"
              className="block bg-white text-[#8D0B41] px-4 py-2 rounded hover:bg-[#FF5C8D] hover:text-white transition"
            >
              My Profile
            </Link>
          </li>
          <li>
            <Link
              to="orders"
              className="block bg-white text-[#8D0B41] px-4 py-2 rounded hover:bg-[#FF5C8D] hover:text-white transition"
            >
              My Orders
            </Link>
          </li>
          <li>
            <Link
              to="reviews"
              className="block bg-white text-[#8D0B41] px-4 py-2 rounded hover:bg-[#FF5C8D] hover:text-white transition"
            >
              My Reviews
            </Link>
          </li>
          <li>
            <Link
              to="favorites"
              className="block bg-white text-[#8D0B41] px-4 py-2 rounded hover:bg-[#FF5C8D] hover:text-white transition"
            >
              Favorite Meals
            </Link>
          </li>
        </ul>
      </div>

    
      <div className="flex-1 p-6 bg-gray-100 min-h-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
