"use client";
import Link from "next/link";
import { useState, useActionState, useEffect } from "react";
import { submitReview } from "../../actions";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fetchReviews, getAverageRating } from "../action";
import { getUser } from "@/app/lib/actions";

type Shortlist = {
  userId: number;
  location?: string;
  name: string;
  jobId?: string;
  jobPoster?: number;
};

type User = {
  location?: string | null;
  name?: string | null;
};

const initState = { success: false, error: undefined };

export default function Shortlisted({ userId, jobId, jobPoster }: Shortlist) {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [rating, setRating] = useState<string>("");
  const [review, setReview] = useState<string>("");
  const [state, formAction, isPending] = useActionState(
    submitReview,
    initState,
  );
  const [allReviews, setAllReviews] = useState(0);
  const [avRating, setAvRating] = useState<string | undefined>("");
  const [user, setUser] = useState<User>();

  useEffect(() => {
    fetchAllReviews();
  }, []);

  const fetchAllReviews = async () => {
    if (userId) {
      const reviews = await fetchReviews(userId);
      const user = await getUser("", userId);
      const average = await getAverageRating(userId);
      setAvRating(average?._avg.rating?.toFixed(1));
      setUser({ location: user?.location, name: user?.username });
      setAllReviews(reviews.length);
    }
  };

  useEffect(() => {
    if (state?.success) {
      setIsDialogOpen(false);
      setRating("");
      setReview("");
    }
  }, [state]);

  const handleSubmit = async (formData: FormData) => {
    await formAction(formData);
  };

  return (
    <div className="w-full max-w-sm px-4 py-2 rounded-xl border border-gray-200">
      <Link
        href={`/my-jobs/${jobId}/overview?tradesperson=${userId}&jobPoster=${jobPoster}`}
        className="flex items-center gap-3 mb-2"
      >
        <Avatar className="w-10 h-10">
          <AvatarFallback className="bg-blue-100 text-[#2f76d9]">
            {user?.name && user?.name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <p
            title={user?.name as string}
            className="font-semibold text-gray-900"
          >{`${user?.name?.slice(0, 30)}...`}</p>
          <p className="text-sm text-gray-800">
            ⭐ <span className="font-bold">{avRating}/5</span>{" "}
            <span className="ml-1 text-gray-400">({allReviews} reviews)</span>
          </p>
          <p className="text-sm text-gray-600 mb-4">📍 {user?.location}</p>
        </div>
      </Link>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <button className="text-blue-600 underline text-sm mb-2 hover:cursor-pointer">
            Add a Review
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>Add Review for {user?.name}</span>
            </DialogTitle>
          </DialogHeader>

          <form action={handleSubmit} className="space-y-4">
            <input type="hidden" value={jobId} name="jobId" />
            <input type="hidden" value={userId} name="userId" />

            <div className="space-y-2">
              <label htmlFor="rating" className="text-sm font-medium">
                Rating
              </label>
              <Select
                name="rating"
                value={rating}
                onValueChange={setRating}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select rating" />
                </SelectTrigger>
                <SelectContent>
                  {[5, 4, 3, 2, 1].map((val) => (
                    <SelectItem key={val} value={val.toString()}>
                      {val} Star{val > 1 && "s"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label htmlFor="review" className="text-sm font-medium">
                Review
              </label>
              <Textarea
                name="review"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Write your review..."
                rows={4}
                required
                className="resize-none"
              />
            </div>

            {state?.success && (
              <p className="text-green-600 text-sm">
                Review submitted successfully! 🎉
              </p>
            )}
            {state?.error && (
              <p className="text-red-500 text-sm">{state.error}</p>
            )}

            <div className="flex gap-2 justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isPending}
                className="bg-blue-500 hover:bg-blue-600"
              >
                {isPending ? (
                  <span className="flex items-center">
                    <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></span>
                    Submitting...
                  </span>
                ) : (
                  "Submit Review"
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
