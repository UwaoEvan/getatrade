"use client";

import { useActionState, useEffect, useState } from "react";
import { format } from "date-fns";
import { replyReview } from "./action";
import { useRouter } from "next/navigation";

type Review = {
  title: string;
  review: string;
  createdAt: Date;
  username: string;
  id: string;
  reply?: string;
  replyCreatedAt?: Date;
};

type Props = {
  review: Review;
};

const initState = { success: false, error: undefined };
export default function ReviewCard({ review }: Props) {
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [state, formAction, isPending] = useActionState(replyReview, initState);
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      setShowReplyBox(false);
      router.refresh();
    }
  }, []);

  return (
    <div className="mb-8">
      <div className="">
        <div className="flex items-center mb-2">
          <span className="text-[#fd914d] mr-2">★★★★★</span>
          <span className="text-gray-500 text-xs">
            Review left on {format(new Date(review.createdAt), "dd MMM yyyy")}
          </span>
        </div>
        <div className="font-bold">{review.title}</div>
        <div className="mt-1 text-gray-700 text-sm">{review.review}</div>
        <div className="text-xs text-gray-400 mt-1">— by {review.username}</div>

        {review?.reply && (
          <div className="mt-6 flex items-start gap-3">
            <div className="bg-gray-100 rounded-md p-4 w-full">
              <p className="font-medium mb-1">Answer from tradesperson:</p>
              <p className="text-sm text-gray-800 whitespace-pre-line">
                {review.reply}
              </p>
              <div className="mt-2 text-xs text-gray-500">
                Reply created{" "}
                {review?.replyCreatedAt &&
                  format(review?.replyCreatedAt, "dd MMM yyyy")}
              </div>
            </div>
          </div>
        )}

        {showReplyBox ? (
          <div className="mt-4 space-y-2">
            <form action={formAction}>
            <input type="hidden" name="reviewId" value={review.id} />
            <textarea
              name="reply"
              placeholder="Write your reply..."
              className="w-full border border-gray-300 rounded-md p-2 text-sm"
              rows={3}
            />
            <div className="flex gap-2">
              <button className="px-4 py-1.5 bg-blue-600 text-white text-sm rounded-md">
                Submit Reply
              </button>
              <button
                onClick={() => setShowReplyBox(false)}
                className="px-4 py-1.5 text-sm text-gray-600"
              >
                Cancel
              </button>
            </div>
            </form>
          </div>
        ) : !review?.reply ? (
          <button
            onClick={() => setShowReplyBox(true)}
            className="mt-4 text-sm text-blue-600 underline"
          >
            Reply
          </button>
        ) : null}
      </div>
    </div>
  );
}
