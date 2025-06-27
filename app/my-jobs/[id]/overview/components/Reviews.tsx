import { TabsContent } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { fetchReviews } from "../../action";
import { CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";

type Props = {
  value: string;
  userId?: number;
};

type Reviews = {
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
};

export default function Review({ value, userId }: Props) {
  const [allReviews, setAllReviews] = useState<Reviews[]>();

  useEffect(() => {
    fetchAllReviews();
  }, []);

  const fetchAllReviews = async () => {
    if (userId) {
      const reviews = await fetchReviews(userId);
      setAllReviews(reviews);
    }
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
    <TabsContent value={value} className="">
      <div className="text-center pb-8 text-gray-500">
        {allReviews?.length === 0 ? (
          <p>No reviews yet</p>
        ) : (
          <CardContent className="p-0 hover:cursor-pointer">
            <div className="space-y-4 p-6">
              {allReviews?.map((review) => (
                <div
                  key={review.id}
                  className="overflow-x-auto border rounded-lg p-6 hover:shadow-md transition-shadow duration-200 bg-gray-50"
                >
                  <div className="flex w-fit items-start gap-4">
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
                        <div className="flex items-center gap-2"></div>
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
        )}
      </div>
    </TabsContent>
  );
}
