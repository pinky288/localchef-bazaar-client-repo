import React, { useEffect, useState } from "react";
import { auth } from "../../firebase/firebase.config";
import { onAuthStateChanged } from "firebase/auth";

const ChefProfile = () => {
  const [chef, setChef] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Chef Profile | Chef Dashboard";

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          
          const res = await fetch(`http://localhost:3000/chefs?email=${user.email}`);
          const data = await res.json();
          if (data.length > 0) setChef(data[0]);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading profile...</p>;
  if (!chef) return <p className="text-center mt-10">No profile found</p>;

  return (
    <div className="p-4 flex justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#8D0B41]">Chef Profile</h2>
        <div className="space-y-3 text-gray-700">
          <p><strong>Name:</strong> {chef.name}</p>
          <p><strong>Email:</strong> {chef.email}</p>
          <p><strong>Phone:</strong> {chef.phone || "N/A"}</p>
          <p><strong>Address:</strong> {chef.address || "N/A"}</p>
        </div>
      </div>
    </div>
  );
};

export default ChefProfile;
