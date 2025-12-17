import { useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";

const useUserRole = () => {
  const [user] = useAuthState(auth);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      setLoading(true);
      fetch(`http://localhost:3000/users/role/${user.email}`, {
        credentials: "include", 
      })
        .then(res => {
          if (!res.ok) throw new Error("Failed to fetch role");
          return res.json();
        })
        .then(data => setRole(data.role))
        .catch(err => {
          console.error("Role fetch error:", err);
          setRole("none"); 
        })
        .finally(() => setLoading(false));
    } else {
      setRole(null);
      setLoading(false);
    }
  }, [user]);

  return { role, loading };
};

export default useUserRole;
