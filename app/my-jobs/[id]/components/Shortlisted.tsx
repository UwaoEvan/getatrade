"use client";
import Link from "next/link";
import { useState, useActionState } from "react";
import { submitReview } from "../../actions";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

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
    <div className="w-full max-w-sm px-4 py-2 rounded-xl border border-gray-200">
      <Link
        href={`/my-jobs/${jobId}/overview`}
        className="flex items-center gap-3 mb-2"
      >
        <Avatar className="w-10 h-10">
          <AvatarFallback className="bg-blue-100 text-[#2f76d9]">
            {name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
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
      </Link>

      <div className="">
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
