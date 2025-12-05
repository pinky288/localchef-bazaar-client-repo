import React from "react";
import { Link } from "react-router-dom";
import logoImg from "../../../assets/chefLogo.jpg";

const NavBar = ({ user, handleLogout }) => {
  return (
    <nav className="bg-white text-black shadow-md px-10 py-3 flex justify-between items-center">
     
      <div className="flex items-center gap-1">
        <img src={logoImg} alt="Logo" className="w-20 h-20" />
        <h1 className="text-2xl font-bold">LocalChefBazaar</h1>
      </div>

      
      <ul className="md:flex gap-6 font-semibold">
        <li className="hover:text-[#fdeadb] cursor-pointer">
          <Link to="/">Home</Link>
        </li>
        <li className="hover:text-[#fcd3b3] cursor-pointer">
          <Link to="/meals">Meals</Link>
        </li>
        {user && (
          <li className="hover:text-[#fcd3b3] cursor-pointer">
            <Link to="/dashboard">Dashboard</Link>
          </li>
        )}
      </ul>

  
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <img
              src={user.photoURL || "/user.jpg"}
              alt="Profile"
              className="w-9 h-9 rounded-full"
            />
            <button
              onClick={handleLogout}
              className="bg-[#fdeadb] font-semibold text-black px-4 py-1 rounded hover:bg-yellow-300"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="hover:text-yellow-400 font-semibold"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-[#fdeadb] text-black px-4 py-1 rounded hover:bg-yellow-300 font-semibold"
            >
              Register
            </Link>
          </>
        )}
      </div>

      <div className="md:hidden">
        <button>☰</button>
      </div>
    </nav>
  );
};

export default NavBar;
