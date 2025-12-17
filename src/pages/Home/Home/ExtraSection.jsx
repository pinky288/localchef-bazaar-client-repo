import React from "react";

const ExtraSection = () => {
  return (
    <div className=" my-10 px-10 bg-white py-10 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-center mb-2 text-[#8D0B41]">
        Why Choose LocalChefBazaar?
      </h2>
      <p className="text-center text-gray-700 mb-8">
  LocalChefBazaar delivers healthy, homemade meals with care. Fresh ingredients, <br />authentic flavors, and fast service make us your trusted choice for <br />daily dining.
</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div className="p-6 border rounded-lg shadow-lg hover:shadow-2xl transition">
          <h3 className="font-semibold text-xl mb-3 text-[#8D0B41]">Fresh Ingredients</h3>
          <p className="text-gray-700">All our meals are prepared using fresh, high-quality ingredients.</p>
        </div>
        <div className="p-6 border rounded-lg shadow-lg hover:shadow-2xl transition">
          <h3 className="font-semibold text-xl mb-3 text-[#8D0B41]">Home-Cooked Meals</h3>
          <p className="text-gray-700">Enjoy authentic homemade flavors made by skilled local chefs.</p>
        </div>
        <div className="p-6 border rounded-lg shadow-lg hover:shadow-2xl transition">
          <h3 className="font-semibold text-xl mb-3 text-[#8D0B41]">Fast Delivery</h3>
          <p className="text-gray-700">Get your meals delivered to your doorstep quickly and safely.</p>
        </div>
      </div>
    </div>
  );
};

export default ExtraSection;
