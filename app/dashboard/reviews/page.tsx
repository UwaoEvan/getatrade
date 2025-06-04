"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import StatsCard from "../components/StatsCard";
import { getAllReviews } from "./actions";

interface Review {
  id: string;
  rating: number;
  createdAt: Date;
  review: string;
  customerId: number;
  tradesPersonId: number;
  reply: string | null;
  replyCreatedAt: Date | null;
  jobId: string;
  jobTitle: string | null;
  creator: string | null;
}

export default function AdminReviewsPage() {
  const [selectedReviews, setSelectedReviews] = useState<string[]>([]);
  const [reviews, setReviews] = useState<Review[]>();

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    const reviews = await getAllReviews();
    setReviews(reviews);
  };

  const handleSelectReview = (reviewId: string) => {
    setSelectedReviews((prev) =>
      prev.includes(reviewId)
        ? prev.filter((id) => id !== reviewId)
        : [...prev, reviewId],
    );
  };

  const handleSelectAll = () => {
    setSelectedReviews(
      selectedReviews.length === reviews?.length
        ? []
        : reviews?.map((review) => review.id) || [],
    );
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-6 space-y-6">
        <div className="flex">
          <StatsCard
            stat={{
              title: "Total Reviews",
              value: reviews?.length,
              change: "+12% from last month",
              icon: Star,
              color: "bg-yellow-100 text-yellow-600",
            }}
          />
        </div>

        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>All Reviews ({reviews?.length})</span>
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={selectedReviews.length === reviews?.length}
                  onCheckedChange={handleSelectAll}
                />
                <span className="text-sm text-gray-500">Select All</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-4 p-6">
              {reviews?.map((review) => (
                <div
                  key={review.id}
                  className="overflow-x-auto border rounded-lg p-6 hover:shadow-md transition-shadow duration-200 bg-gray-50"
                >
                  <div className="flex w-fit items-start gap-4">
                    <Checkbox
                      checked={selectedReviews.includes(review.id)}
                      onCheckedChange={() => handleSelectReview(review.id)}
                      className="mt-1"
                    />

                    <div className="flex-1 space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10 bg-blue-100">
                            <AvatarFallback className="text-blue-600 font-medium">
                              {review.creator?.charAt(0) || "A"}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-gray-900">
                                {review.creator || "Anonymous"}
                              </span>
                            </div>
                            <div className="text-sm text-gray-500">
                              {review.jobTitle}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {/* <Badge className={getStatusBadgeColor(review.status)}>
                            {review.status}
                          </Badge>
                          <Badge
                            className={getCategoryBadgeColor(review.category)}
                            variant="secondary"
                          >
                            {review.category}
                          </Badge> */}
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex">
                            {renderStars(review.rating)}
                          </div>
                          <span className="text-sm text-gray-600">
                            {review.rating}/5 •{" "}
                            {new Date(review.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <p className="text-gray-700 text-sm line-clamp-3">
                          {review.review}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
