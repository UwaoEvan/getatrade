"use client";
import Link from "next/link";
import { useState, useActionState } from "react";
import { submitReview } from "../../actions";

type Shortlist = {
  userId: number;
  location?: string;
  name: string;
  jobId?: string;
};
const initState = { success: false, error: undefined };
export default function Shortlisted({
  userId,
  location,
  name,
  jobId,
}: Shortlist) {
  const [showReviewForm, setShowReviewForm] = useState<boolean>(false);
  const [state, formAction, isPending] = useActionState(
    submitReview,
    initState,
  );
  return (
    <div className="w-full max-w-sm p-4 bg-white rounded-xl shadow-md border border-gray-200">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5.121 17.804A3 3 0 017.58 16h8.838a3 3 0 012.46 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>
        <div>
          <p
            title={name}
            className="font-semibold text-gray-900"
          >{`${name?.slice(0, 30)}...`}</p>
          <p className="text-sm text-gray-500">
            ⭐ 0/0 <span className="ml-1 text-gray-400">(0 reviews)</span>
          </p>
          <p className="text-sm text-gray-600 mb-4">📍 {location}</p>
        </div>
      </div>
      <Link
        href={`/my-account/${userId}`}
        className="w-full text-center  block py-2 px-4 bg-[#2f76d9] text-white font-medium rounded-lg hover:bg-[#2f76d9] hover:cursor-pointer transition"
      >
        View profile
      </Link>

      <div className="mt-2">
        <button
          onClick={() => setShowReviewForm(!showReviewForm)}
          className="text-blue-600 underline text-sm mb-2 hover:cursor-pointer"
        >
          {showReviewForm ? "Close" : "Add a Review"}
        </button>

        {showReviewForm && (
          <form action={formAction}>
            <input type="hidden" value={jobId} name="jobId" />
            <input type="hidden" value={userId} name="userId" />
            <select
              name="rating"
              required
              className="w-full mb-2 border border-gray-300 p-2 rounded"
            >
              <option value="">Select rating</option>
              {[5, 4, 3, 2, 1].map((val) => (
                <option key={val} value={val}>
                  {val} Star{val > 1 && "s"}
                </option>
              ))}
            </select>

            <textarea
              className="w-full p-2 border rounded my-2"
              rows={3}
              placeholder="Write your review..."
              name="review"
              required
            />

            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
            >
              {isPending ? (
                <span className="flex items-center justify-center">
                  <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></span>
                  Submitting...
                </span>
              ) : (
                "Submit Review"
              )}
            </button>
            {state?.success && (
              <p className="text-green-600 mt-2">
                Job posting created successfully! 🎉
              </p>
            )}
            {state?.error && <p className="text-red-500 mt-2">{state.error}</p>}
          </form>
        )}
      </div>
    </div>
  );
}
