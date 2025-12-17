import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";
import registerBg from "../../assets/logreg-bg.jpg";
import Swal from "sweetalert2";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    document.title = "Register | LocalChef";
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Passwords do not match",
      });
      return;
    }

    try {
   
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      
      await updateProfile(user, {
        displayName: name,
        photoURL: profileImage || "https://i.ibb.co/4nKsyKWp/4efc915e876df3fa95e6119bf781e939.jpg",
      });

      Swal.fire({
        icon: "success",
        title: "Registration Successful",
        text: "You can now login",
      }).then(() => {
        navigate("/login");
      });
    } catch (err) {
      console.error(err);
      setError(err.message);
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: err.message,
      });
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-start justify-center"
      style={{ backgroundImage: `url(${registerBg})` }}
    >
      <div className="bg-white bg-opacity-90 rounded-lg shadow-lg p-8 mt-24 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#8D0B41]">
          Register
        </h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-[#8D0B41]"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-[#8D0B41]"
            required
          />
          <input
            type="text"
            placeholder="Profile Image URL (optional)"
            value={profileImage}
            onChange={(e) => setProfileImage(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-[#8D0B41]"
          />
          <input
            type="text"
            placeholder="Address (optional)"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-[#8D0B41]"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-[#8D0B41]"
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-[#8D0B41]"
            required
          />

          <button
            type="submit"
            className="mt-4 bg-[#8D0B41] text-white py-2 rounded hover:bg-[#6F0832] transition font-semibold"
          >
            Register
          </button>
        </form>

        <p className="text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-[#8D0B41] font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
