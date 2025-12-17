import React, { useEffect, useState } from "react";
import axiosSecure from "../../../axiosSecure";
import { auth } from "../../../firebase/firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";

const AdminProfile = () => {
  const [user] = useAuthState(auth);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (user?.email) {
      const fetchProfile = async () => {
    try {
        const res = await axiosSecure.get(`/users/role/${user.email}`);
          setProfile({ ...res.data, email: user.email, name: user.displayName || "Admin" });
        } catch (err) {
          console.error(err);
        }
      };
      fetchProfile();
    }
  }, [user]);

  if (!profile) return <p className="text-center mt-10">Loading profile...</p>;
  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-[#8D0B41]">Admin Profile</h2>
      <p><strong>Name:</strong> {profile.name}</p>
      <p><strong>Email:</strong> {profile.email}</p>
      <p><strong>Role:</strong> {profile.role}</p>
      <p><strong>Status:</strong> Active</p>
    </div>
);
};

export default AdminProfile;
