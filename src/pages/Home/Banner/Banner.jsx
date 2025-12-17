import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import banner1 from "../../../assets/banner1.jpg";
import banner2 from "../../../assets/banner2.jpg";
import banner3 from "../../../assets/banner3.jpg";
import banner4 from "../../../assets/banner4.jpg";

const banners = [
  { image: banner1, heading: "Delicious Homemade Meals", subtitle: "Fresh & healthy meals!", cta: "Order Now" },
  { image: banner2, heading: "Taste the Love in Every Bite", subtitle: "Cooked with care.", cta: "Explore Meals" },
  { image: banner3, heading: "Your Daily Meals, Simplified", subtitle: "Affordable & fresh.", cta: "View Menu" },
  { image: banner4, heading: "Experience Home-Cooked Love", subtitle: "Healthy & tasty.", cta: "Check Menu" },
];

const Banner = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden flex bg-white">
      <AnimatePresence>
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="flex w-full h-full"
        >
         
          <div className="w-1/2 h-full flex justify-center items-center overflow-hidden bg-white">
            <motion.img
              src={banners[current].image}
              alt={banners[current].heading}
              className="h-full w-full object-cover"
              initial={{ scale: 1 }}
              animate={{ scale: 1.05 }}
              transition={{ duration: 5 }}
            />
          </div>

          
          <div className="w-1/2 h-full flex flex-col justify-center px-8 md:px-16 text-[#8D0B41] bg-white">
            <motion.h1
              key={banners[current].heading}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3"
            >
              {banners[current].heading}
            </motion.h1>
            <motion.p
              key={banners[current].subtitle}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="mb-4 md:mb-6 text-sm md:text-lg"
            >
              {banners[current].subtitle}
            </motion.p>
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "#6F0832" }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#8D0B41] text-white px-4 md:px-6 py-2 font-semibold rounded shadow transition w-max"
            >
              {banners[current].cta}
            </motion.button>
          </div>
        </motion.div>
      </AnimatePresence>

     
      <div className="absolute bottom-4 md:bottom-5 left-1/2 transform -translate-x-1/2 flex gap-2 md:gap-3 z-10">
        {banners.map((_, idx) => (
          <motion.button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full ${current === idx ? "bg-[#8D0B41]" : "bg-white/50"}`}
            whileHover={{ scale: 1.3 }}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
