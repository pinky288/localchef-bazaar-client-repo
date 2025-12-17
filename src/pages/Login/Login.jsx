import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";
import bgImage from "../../assets/logreg-bg.jpg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      
      await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
          name: user.displayName || "User",
          uid: user.uid,
        }),
      });

      
      const jwtResponse = await fetch("http://localhost:3000/jwt", {
        method: "POST",
        credentials: "include", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email }),
      });

      if (!jwtResponse.ok) throw new Error("Failed to get JWT");
      const jwtData = await jwtResponse.json();
      console.log("JWT cookie set:", jwtData);

      
      const roleRes = await fetch(`http://localhost:3000/users/role/${user.email}`, {
        method: "GET",
        credentials: "include",
      });

      if (!roleRes.ok) throw new Error("Failed to fetch user role");
      const roleData = await roleRes.json();
      console.log("User role:", roleData);

      
      navigate("/dashboard/profile");
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="bg-white bg-opacity-90 shadow-lg rounded-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-[#8D0B41] text-center mb-6">Login</h1>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {loading && <p className="text-center mb-4">Loading...</p>}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#8D0B41]"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#8D0B41]"
          />
          <button
            type="submit"
            className="bg-[#8D0B41] hover:bg-[#6F0832] text-white font-semibold py-2 rounded-lg transition"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-4 text-gray-700 text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="text-[#8D0B41] font-semibold hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
