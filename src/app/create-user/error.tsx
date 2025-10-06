"use client";

import { useEffect } from "react";

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
    <div className="flex flex-col items-center justify-center min-h-screen text-center text-gray-200">
      <h2 className="text-2xl font-semibold mb-4">Something went wrong</h2>
      <p className="mb-6 text-gray-400">{error.message}</p>
      <button
        onClick={() => reset()}
        className="px-4 py-2 rounded-lg bg-pink-600 hover:bg-pink-700"
      >
        Try again
      </button>
    </div>
  );
}
