import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";

const DashboardRedirect = () => {
  const [user, loading] = useAuthState(auth);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const token = localStorage.getItem("accessToken");
      if (token) {
        try {
       const payload = JSON.parse(atob(token.split(".")[1]));
     setRole(payload.role);
        } catch {
          setRole("user"); 
        }
      } else {
            fetch(`http://localhost:3000/users/role/${user.email}`)
          .then(res => res.json())
          .then(data => setRole(data.role))
          .catch(err => console.error(err));
      }
    }
  }, [user]);
  if (loading || !user || !role) return <p className="text-center mt-10">Loading...</p>;

  useEffect(() => {
    if (role === "user") navigate("/dashboard", { replace: true });
    else if (role === "chef") navigate("/dashboard/chef", { replace: true });
    else if (role === "admin") navigate("/dashboard/admin", { replace: true });
  }, [role, navigate]);

  
  return null;
};

export default DashboardRedirect;
