"use client";

import Link from "next/link";

export default function PaymentSuccessPage() {
  return (
    <div className="flex items-center justify-center px-4">
      <div className="bg-white  p-8 max-w-md text-center">
        {/* ✅ Inline SVG Checkmark */}
        <svg
          className="mx-auto mb-4 w-16 h-16 text-green-500"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>

        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Payment Successful!
        </h1>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. A confirmation email will be sent
          shortly.
        </p>

        <Link
          href="/"
          className="inline-block bg-[#2f76d9] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#245fb2] transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
