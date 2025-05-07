"use client";

import ErrorDisplay from "@/components/ErrorDisplay/ErrorDisplay";
import { useEffect, useState } from "react";

export default function GlobalError({ error, reset }) {
  const [message, setMessage] = useState(null);

  useEffect(() => {
    setMessage(error.message || "An unexpected error occurred.");
    console.error(error);
  }, [error]);

  return (
    <html>
      <body className="h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg text-center">
          <h2 className="text-3xl font-bold text-red-600 mb-4">Something Went Wrong GlobalError</h2>
          <p className="text-gray-700 mb-6">{message}</p>
          {/* <ErrorDisplay message={message} reset={reset} /> */}
          <button
            onClick={reset}
            className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}