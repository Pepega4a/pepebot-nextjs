'use client';

export default function CommandsError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="container-wrapper py-12 text-center">
      <h2 className="text-2xl font-bold text-red-500 mb-4">
        Something went wrong!
      </h2>
      <p className="text-gray-400 mb-6">{error.message}</p>
      <button
        onClick={reset}
        className="btn-primary"
      >
        Try again
      </button>
    </div>
  );
} 