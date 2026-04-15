"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] bg-[#f1f3f6] p-4 text-center">
      <div className="bg-white p-8 rounded-sm shadow-sm flex flex-col items-center max-w-md w-full">
        <AlertCircle className="h-16 w-16 text-yellow-500 mb-4" />
        <h2 className="text-xl font-bold text-gray-800 mb-2">Oops! Something went wrong</h2>
        <p className="text-gray-600 mb-6 text-sm">
          We are unable to process your request right now. Let's get you back on track.
        </p>
        <div className="flex gap-4 w-full">
          <button
            onClick={() => reset()}
            className="flex-1 bg-[#2874f0] text-white py-2.5 rounded-sm font-semibold hover:bg-blue-600 transition"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="flex-1 bg-white border border-gray-300 text-gray-700 py-2.5 rounded-sm font-semibold hover:bg-gray-50 flex items-center justify-center transition"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
