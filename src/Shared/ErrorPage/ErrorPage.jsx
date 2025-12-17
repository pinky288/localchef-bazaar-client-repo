import React, { useEffect } from "react";
import { Link, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();

 
  useEffect(() => {
    document.title = "404 | Page Not Found";
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 text-center">
      <h1 className="text-6xl font-extrabold text-[#8D0B41] mb-4">404</h1>

      <h2 className="text-2xl font-bold mb-2">
        Oops! Page not found
      </h2>

      <p className="text-gray-600 max-w-md mb-6">
        {error?.statusText ||
          error?.message ||
          "The page you are looking for might have been removed or is temporarily unavailable."}
      </p>

      <Link
        to="/"
        className="px-6 py-2 bg-[#8D0B41] text-white rounded-md hover:bg-[#FF5C8D] transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default ErrorPage;
