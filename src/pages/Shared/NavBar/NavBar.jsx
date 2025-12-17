import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logoImg from "../../../assets/chefLogo.jpg";
import { auth } from "../../../firebase/firebase.config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { HiMenu, HiX } from "react-icons/hi"; 

const NavBar = () => {
  const [user, setUser] = useState(null);
  const [showLogout, setShowLogout] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => setUser(null))
      .catch((err) => console.error(err));
  };

  return (
    <nav className="bg-white sticky top-0 z-50 shadow-md px-5 md:px-10 py-3 flex justify-between items-center">
     
      <div className="flex items-center gap-3">
        <img src={logoImg} alt="Logo" className="w-12 h-12 md:w-14 md:h-14 rounded-full shadow-sm" />
        <h1 className="text-2xl md:text-3xl font-bold text-[#8D0B41]">LocalChefBazaar</h1>
      </div>

  
      <ul className="hidden md:flex gap-8 font-semibold text-[#8D0B41]">
        <li className="hover:text-[#FF5C8D] transition"><Link to="/">Home</Link></li>
        <li className="hover:text-[#FF5C8D] transition"><Link to="/meals">Meals</Link></li>
        {user && <li className="hover:text-[#FF5C8D] transition"><Link to="/dashboard">Dashboard</Link></li>}
      </ul>

      
      <div className="hidden md:flex items-center gap-4 relative">
        {user ? (
          <div
            className="relative"
            onMouseEnter={() => setShowLogout(true)}
            onMouseLeave={() => setShowLogout(false)}
          >
            <img
              src={user.photoURL || "https://i.ibb.co/4nKsyKWp/4efc915e876df3fa95e6119bf781e939.jpg"}
              alt="Profile"
              className="w-10 h-10 rounded-full shadow-sm cursor-pointer"
            />
            <AnimatePresence>
              {showLogout && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-12 right-0 bg-white border rounded shadow-md p-2 w-24 text-center"
                >
                  <button
                    onClick={handleLogout}
                    className="text-[#8D0B41] font-semibold hover:text-[#FF5C8D] transition"
                  >
                    Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <>
            <Link to="/login" className="hover:text-[#FF5C8D] font-semibold transition">Login</Link>
            <Link
              to="/register"
              className="bg-[#8D0B41] text-white px-4 py-1 rounded shadow font-semibold hover:bg-[#6F0832] transition"
            >
              Register
            </Link>
          </>
        )}
      </div>

     
      <div className="md:hidden flex items-center">
        <button onClick={() => setMobileMenu(!mobileMenu)}>
          {mobileMenu ? <HiX className="w-6 h-6 text-[#8D0B41]" /> : <HiMenu className="w-6 h-6 text-[#8D0B41]" />}
        </button>
      </div>

     
      <AnimatePresence>
        {mobileMenu && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white shadow-md border-t flex flex-col items-center gap-4 py-4 md:hidden z-40"
          >
            <Link to="/" onClick={() => setMobileMenu(false)} className="text-[#8D0B41] font-semibold hover:text-[#FF5C8D] transition">Home</Link>
            <Link to="/meals" onClick={() => setMobileMenu(false)} className="text-[#8D0B41] font-semibold hover:text-[#FF5C8D] transition">Meals</Link>
            {user && (
              <Link to="/dashboard" onClick={() => setMobileMenu(false)} className="text-[#8D0B41] font-semibold hover:text-[#FF5C8D] transition">Dashboard</Link>
            )}
            <hr className="w-3/4 border-[#8D0B41]/30" />
            {user ? (
              <button
                onClick={() => { handleLogout(); setMobileMenu(false); }}
                className="text-[#8D0B41] font-semibold hover:text-[#FF5C8D] transition"
              >
                Logout
              </button>
            ) : (
              <div className="flex flex-col gap-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenu(false)}
                  className="text-[#8D0B41] font-semibold hover:text-[#FF5C8D] transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenu(false)}
                  className="bg-[#8D0B41] text-white px-4 py-1 rounded shadow font-semibold hover:bg-[#6F0832] transition text-center"
                >
                  Register
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default NavBar;
