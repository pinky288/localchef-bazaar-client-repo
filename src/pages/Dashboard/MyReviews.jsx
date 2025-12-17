import React, { useEffect, useState } from "react";
import { auth } from "../../firebase/firebase.config";
import { FiTrash2 } from "react-icons/fi";
import Swal from "sweetalert2";

const MyReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "My Reviews | Your App Name";
  }, []);

  const fetchReviews = async () => {
    const userEmail = auth.currentUser?.email;
    if (!userEmail) return;

    try {
      const res = await fetch(`http://localhost:3000/reviews?userEmail=${userEmail}`);
      const data = await res.json();
      setReviews(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await fetch(`http://localhost:3000/reviews/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete review");

      setReviews(reviews.filter((review) => review._id !== id));
      Swal.fire("Deleted!", "Your review has been deleted.", "success");
    } catch (err) {
      Swal.fire("Error!", "Failed to delete review.", "error");
      console.error(err);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading reviews...</p>;
  if (reviews.length === 0) return <p className="text-center mt-10">No reviews found.</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6 text-center text-[#8D0B41]">My Reviews</h2>
      <div className="space-y-4">
        {reviews.map((review) => {
          const reviewerName = review.reviewerName || review.name || "Anonymous";
          const reviewerImage = review.reviewerImage || review.image || "https://i.ibb.co/your-default-avatar.png";
          const mealName = review.meal || "N/A";
          const reviewDate = review.date ? new Date(review.date).toLocaleDateString() : "N/A";

          return (
            <div
              key={review._id}
              className="bg-white p-4 sm:p-6 rounded-lg shadow flex flex-col sm:flex-row sm:items-start gap-4 relative"
            >
              <img
                src={reviewerImage}
                alt={reviewerName}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold">{reviewerName}</h3>
                <p className="text-sm text-gray-500">Meal: {mealName}</p>
                <p>Rating: {review.rating} ⭐</p>
                <p>Comment: {review.comment}</p>
                <p className="text-sm text-gray-500">Date: {reviewDate}</p>
              </div>
              <button
                onClick={() => handleDelete(review._id)}
                className="absolute top-4 right-4 text-red-600 hover:text-red-800"
                title="Delete Review"
              >
                <FiTrash2 size={20} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyReviews;
