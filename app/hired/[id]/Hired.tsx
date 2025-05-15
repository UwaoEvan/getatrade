"use client";

export default function ShortlistFee() {
  return (
    <div className="w-full border-1 border-gray-200 p-4 rounded-lg">
      <h2 className="font-semibold mb-2">Contact details shared</h2>
      <p className="text-sm text-green-700 bg-green-100 p-2 rounded mb-3">
        You can now contact the customer.
      </p>
      <div className="space-y-2 text-gray-800 text-base">
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5.121 17.804A11.955 11.955 0 0112 15c2.2 0 4.25.64 5.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span>Brendan O Shea</span>
        </div>

        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 5a2 2 0 012-2h1.586a1 1 0 01.707.293l2.828 2.828a1 1 0 01.293.707V8a1 1 0 01-1 1H7v1a1 1 0 01-1 1H5a2 2 0 01-2-2V5zm13.414 9.414a1 1 0 00-1.414 0l-1.293 1.293a1 1 0 000 1.414l2.586 2.586a1 1 0 001.414 0l1.293-1.293a1 1 0 000-1.414l-2.586-2.586z"
            />
          </svg>
          <a href="tel:+447711589839" className="underline hover:text-blue-600">
            +447711589839
          </a>
        </div>
      </div>
    </div>
  );
}
