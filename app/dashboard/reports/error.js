"use client";

import ErrorDisplay from "@/components/ErrorDisplay/ErrorDisplay";
import { useEffect, useState } from "react";

export default function Error({ error, reset }) {
  const [message, setMessage] = useState(null);

  useEffect(() => {
    setMessage(error.message || "An unexpected error occurred.");
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Something Went Wrong in App</h2>
        <p className="text-gray-700 mb-6">{message}</p>
        {/* <ErrorDisplay message={message} reset={reset} /> */}
        <button
          onClick={reset}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}