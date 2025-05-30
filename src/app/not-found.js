import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-blue-600 dark:text-blue-400 text-9xl font-extrabold animate-bounce">
          404
        </div>
        <h1 className="text-3xl md:text-4xl font-semibold text-gray-800 dark:text-white mt-4">
          Page Not Found
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2 text-lg max-w-md mx-auto">
          Sorry, the page you are looking for doesn’t exist or has been moved.
        </p>
        <Link
          href={`/dashboard`}
          className="mt-6 inline-block px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 transition rounded-full text-lg font-medium shadow-lg"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
