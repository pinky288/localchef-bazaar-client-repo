import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from "react-router-dom";
import { auth } from "../firebase/firebase.config";

const PrivateRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);

  console.log("AUTH STATE ", { user, loading });

if (loading) return <p>Loading...</p>;
if (!user) return <Navigate to="/login" />;
return children;
};

export default PrivateRoute;
