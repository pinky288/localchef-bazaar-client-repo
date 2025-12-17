import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";
import axios from "axios";

const MyProfile = () => {
  const [user, setUser] = useState(null);
  const [requestSent, setRequestSent] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser({
          _id: currentUser.uid,
          name: currentUser.displayName || "No Name",
          email: currentUser.email,
          image:
            currentUser.photoURL ||
            "https://i.ibb.co/4nKsyKWp/4efc915e876df3fa95e6119bf781e939.jpg",
          role: "user", 
        });
      }
    });

    return () => unsubscribe();
  }, []);

  const handleRoleRequest = async (type) => {
    if (requestSent) return;

    try {
      const res = await axios.post("http://localhost:3000/role-request", {
        userId: user._id,
        userName: user.name,
        userEmail: user.email,
        requestType: type, 
      });

      alert(res.data.message);
      setRequestSent(true); 
    } catch (error) {
      console.error(error);
      alert("Failed to send request");
    }
  };

  if (!user) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">My Profile</h2>

      <div className="flex items-center space-x-4 mb-6">
        <img
          src={user.image}
          alt={user.name}
          className="w-24 h-24 rounded-full"
        />
        <div>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
        </div>
      </div>

      
      <div className="space-x-4">
        <button
          disabled={requestSent}
          onClick={() => handleRoleRequest("chef")}
          className={`px-4 py-2 rounded text-white ${
            requestSent ? "bg-gray-400" : "bg-[#8D0B41] hover:bg-[#ff006a]"
          }`}
        >
          Be a Chef
        </button>

        <button
          disabled={requestSent}
          onClick={() => handleRoleRequest("admin")}
          className={`px-4 py-2 rounded text-white ${
            requestSent ? "bg-gray-400" : "bg-[#8D0B41] hover:bg-[#ff006a]"
          }`}
        >
          Be an Admin
        </button>
      </div>
    </div>
  );
};

export default MyProfile;
