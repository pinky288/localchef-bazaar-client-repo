import React, { useEffect, useState } from "react";

const CustomerReviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const res = await fetch("http://localhost:3000/reviews"); 
        const data = await res.json();
        setReviews(data);
      } catch (err) {
        console.error("Fetch Reviews Error:", err);
      }
    }

    fetchReviews();
  }, []);

  return (
    <div className="my-10 px-4 md:px-40">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-2 text-[#8D0B41]">
        Customer Reviews
      </h2>
      <p className="text-center text-gray-700 mb-8">
  Hear from our satisfied customers who love our homemade meals.<br /> Authentic flavors, quick delivery, and fresh ingredients <br />make every bite unforgettable and delightful.
</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="border rounded-lg shadow-lg p-4 flex flex-col items-center text-center hover:shadow-2xl transition"
          >
            <img
              src={review.image}
              alt={review.name}
              className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover mb-3 border-2 border-[#8D0B41]"
            />
            <h3 className="text-lg md:text-xl font-semibold text-[#8D0B41]">{review.name}</h3>
            <p className="text-yellow-500 my-1">
              {"★".repeat(review.rating) + "☆".repeat(5 - review.rating)}
            </p>
            <p className="text-gray-700 text-sm md:text-base">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerReviews;
