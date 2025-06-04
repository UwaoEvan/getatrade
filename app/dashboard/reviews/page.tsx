"use client";

import { useState } from "react";
import {
  Eye,
  MessageSquare,
  Flag,
  Check,
  X,
  MoreHorizontal,
  Star,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import StatsCard from "../components/StatsCard";

interface Review {
  id: string;
  reviewer: {
    name: string;
    email: string;
    initials: string;
    verified: boolean;
  };
  company: string;
  jobTitle: string;
  rating: number;
  title: string;
  content: string;
  pros: string;
  cons: string;
  status: "Pending" | "Approved" | "Rejected" | "Flagged";
  submittedDate: string;
  moderatedDate?: string;
  moderatedBy?: string;
  helpful: number;
  notHelpful: number;
  responses: number;
  category:
    | "Work Environment"
    | "Management"
    | "Compensation"
    | "Career Growth"
    | "Work-Life Balance";
  anonymous: boolean;
  currentEmployee: boolean;
}

const reviews: Review[] = [
  {
    id: "1",
    reviewer: {
      name: "John Smith",
      email: "john.smith@email.com",
      initials: "JS",
      verified: true,
    },
    company: "TechCorp Inc.",
    jobTitle: "Software Engineer",
    rating: 4,
    title: "Great place to work with excellent benefits",
    content:
      "I've been working at TechCorp for over 2 years now and it's been a fantastic experience. The company culture is very supportive and collaborative. Management is transparent about company goals and direction. The work-life balance is excellent with flexible working hours and remote work options.",
    pros: "Great benefits, flexible hours, supportive team, good compensation",
    cons: "Limited career advancement opportunities, outdated tech stack in some projects",
    status: "Approved",
    submittedDate: "2024-01-15",
    moderatedDate: "2024-01-16",
    moderatedBy: "Admin User",
    helpful: 24,
    notHelpful: 3,
    responses: 1,
    category: "Work Environment",
    anonymous: false,
    currentEmployee: true,
  },
  {
    id: "2",
    reviewer: {
      name: "Anonymous User",
      email: "user2@email.com",
      initials: "AU",
      verified: false,
    },
    company: "StartupXYZ",
    jobTitle: "Product Manager",
    rating: 2,
    title: "Poor management and unrealistic expectations",
    content:
      "The company has potential but the management is terrible. Unrealistic deadlines, poor communication, and no work-life balance. They promise a lot during interviews but deliver very little. Would not recommend to anyone looking for a stable work environment.",
    pros: "Innovative products, young team",
    cons: "Poor management, unrealistic deadlines, no work-life balance, low compensation",
    status: "Pending",
    submittedDate: "2024-01-18",
    helpful: 8,
    notHelpful: 12,
    responses: 0,
    category: "Management",
    anonymous: true,
    currentEmployee: false,
  },
  {
    id: "3",
    reviewer: {
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      initials: "SJ",
      verified: true,
    },
    company: "Design Studio Pro",
    jobTitle: "UX Designer",
    rating: 5,
    title: "Amazing creative environment and growth opportunities",
    content:
      "This is hands down the best company I've worked for. The creative freedom is incredible, and the team is super talented. Management actually listens to feedback and implements changes. Great learning opportunities and they invest in employee development.",
    pros: "Creative freedom, talented team, great management, learning opportunities, good benefits",
    cons: "Can be high pressure during client deadlines, office space is a bit cramped",
    status: "Approved",
    submittedDate: "2024-01-12",
    moderatedDate: "2024-01-13",
    moderatedBy: "Admin User",
    helpful: 31,
    notHelpful: 2,
    responses: 2,
    category: "Career Growth",
    anonymous: false,
    currentEmployee: true,
  },
  {
    id: "4",
    reviewer: {
      name: "Mike Wilson",
      email: "mike.w@email.com",
      initials: "MW",
      verified: true,
    },
    company: "CloudTech Solutions",
    jobTitle: "DevOps Engineer",
    rating: 1,
    title: "Toxic work environment - stay away!",
    content:
      "This place is absolutely terrible. Toxic management, no respect for employees, and they expect you to work 60+ hours a week. The CEO is completely out of touch with reality. They don't care about employee wellbeing at all. I quit after 6 months.",
    pros: "Good salary initially",
    cons: "Toxic management, overwork, no work-life balance, high turnover, poor leadership",
    status: "Flagged",
    submittedDate: "2024-01-20",
    helpful: 15,
    notHelpful: 5,
    responses: 0,
    category: "Work-Life Balance",
    anonymous: false,
    currentEmployee: false,
  },
  {
    id: "5",
    reviewer: {
      name: "Emily Davis",
      email: "emily.d@email.com",
      initials: "ED",
      verified: true,
    },
    company: "Growth Marketing Co.",
    jobTitle: "Marketing Specialist",
    rating: 3,
    title: "Decent place to start your career",
    content:
      "It's an okay place to work, especially if you're just starting out in marketing. You'll learn a lot and get good experience. However, the compensation could be better and there's not much room for advancement. Management is hit or miss depending on your direct supervisor.",
    pros: "Good learning experience, friendly colleagues, flexible schedule",
    cons: "Low compensation, limited advancement, inconsistent management",
    status: "Rejected",
    submittedDate: "2024-01-10",
    moderatedDate: "2024-01-11",
    moderatedBy: "Admin User",
    helpful: 7,
    notHelpful: 4,
    responses: 0,
    category: "Compensation",
    anonymous: false,
    currentEmployee: true,
  },
];

const stats = [
  {
    title: "Total Reviews",
    value: "1,847",
    change: "+156 this month",
    trend: "up",
    icon: MessageSquare,
    color: "bg-blue-100 text-blue-600",
  },
  // {
  //   title: "Pending Reviews",
  //   value: "23",
  //   change: "Awaiting moderation",
  //   trend: "neutral",
  //   icon: Clock,
  //   color: "bg-yellow-100 text-yellow-600",
  // },
  // {
  //   title: "Flagged Reviews",
  //   value: "8",
  //   change: "Need attention",
  //   trend: "neutral",
  //   icon: AlertTriangle,
  //   color: "bg-red-100 text-red-600",
  // },
  // {
  //   title: "Average Rating",
  //   value: "3.8",
  //   change: "+0.2 from last month",
  //   trend: "up",
  //   icon: Star,
  //   color: "bg-green-100 text-green-600",
  // },
];

export default function AdminReviewsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [selectedReviews, setSelectedReviews] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [moderationNote, setModerationNote] = useState("");

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "Pending":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      case "Rejected":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      case "Flagged":
        return "bg-orange-100 text-orange-800 hover:bg-orange-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  const getCategoryBadgeColor = (category: string) => {
    const colors = {
      "Work Environment": "bg-blue-100 text-blue-800",
      Management: "bg-purple-100 text-purple-800",
      Compensation: "bg-green-100 text-green-800",
      "Career Growth": "bg-indigo-100 text-indigo-800",
      "Work-Life Balance": "bg-pink-100 text-pink-800",
    };
    return (
      colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800"
    );
  };

  const handleOpenModal = (review: Review) => {
    setSelectedReview(review);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedReview(null);
    setModerationNote("");
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
      selectedReviews.length === reviews.length
        ? []
        : reviews.map((review) => review.id),
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

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.reviewer.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      review.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesRating =
      ratingFilter === "all" || review.rating.toString() === ratingFilter;
    return matchesSearch && matchesStatus && matchesRating;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-6 space-y-6">
        <div className="flex">
          {stats.map((stat, index) => (
            <StatsCard key={index} stat={stat} />
          ))}
        </div>

        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>All Reviews ({filteredReviews.length})</span>
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={selectedReviews.length === reviews.length}
                  onCheckedChange={handleSelectAll}
                />
                <span className="text-sm text-gray-500">Select All</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-4 p-6">
              {filteredReviews.map((review) => (
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
                      {/* Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10 bg-blue-100">
                            <AvatarFallback className="text-blue-600 font-medium">
                              {review.reviewer.initials}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-gray-900">
                                {review.anonymous
                                  ? "Anonymous"
                                  : review.reviewer.name}
                              </span>
                              {review.reviewer.verified && (
                                <Badge className="bg-blue-100 text-blue-800 text-xs">
                                  Verified
                                </Badge>
                              )}
                              {review.currentEmployee && (
                                <Badge className="bg-green-100 text-green-800 text-xs">
                                  Current Employee
                                </Badge>
                              )}
                            </div>
                            <div className="text-sm text-gray-500">
                              {review.jobTitle} at {review.company}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getStatusBadgeColor(review.status)}>
                            {review.status}
                          </Badge>
                          <Badge
                            className={getCategoryBadgeColor(review.category)}
                            variant="secondary"
                          >
                            {review.category}
                          </Badge>
                        </div>
                      </div>

                      {/* Rating and Title */}
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex">
                            {renderStars(review.rating)}
                          </div>
                          <span className="text-sm text-gray-600">
                            {review.rating}/5 •{" "}
                            {new Date(
                              review.submittedDate,
                            ).toLocaleDateString()}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {review.title}
                        </h3>
                      </div>

                      {/* Content */}
                      <div className="space-y-3">
                        <p className="text-gray-700 line-clamp-3">
                          {review.content}
                        </p>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-medium text-green-700 mb-1">
                              Pros:
                            </h4>
                            <p className="text-sm text-gray-600">
                              {review.pros}
                            </p>
                          </div>
                          <div>
                            <h4 className="font-medium text-red-700 mb-1">
                              Cons:
                            </h4>
                            <p className="text-sm text-gray-600">
                              {review.cons}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t">
                        <div className="flex items-center gap-6 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <ThumbsUp className="h-4 w-4" />
                            <span>{review.helpful} helpful</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <ThumbsDown className="h-4 w-4" />
                            <span>{review.notHelpful} not helpful</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageSquare className="h-4 w-4" />
                            <span>{review.responses} responses</span>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleOpenModal(review)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View Details
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="outline" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem className="text-green-600">
                                <Check className="h-4 w-4 mr-2" />
                                Approve Review
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <X className="h-4 w-4 mr-2" />
                                Reject Review
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-orange-600">
                                <Flag className="h-4 w-4 mr-2" />
                                Flag for Review
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <MessageSquare className="h-4 w-4 mr-2" />
                                Contact Reviewer
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Review Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Review Details & Moderation</DialogTitle>
          </DialogHeader>

          {selectedReview && (
            <div className="space-y-6">
              {/* Reviewer Info */}
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <Avatar className="h-12 w-12 bg-blue-100">
                  <AvatarFallback className="text-blue-600 font-medium">
                    {selectedReview.reviewer.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">
                      {selectedReview.anonymous
                        ? "Anonymous User"
                        : selectedReview.reviewer.name}
                    </span>
                    {selectedReview.reviewer.verified && (
                      <Badge className="bg-blue-100 text-blue-800 text-xs">
                        Verified
                      </Badge>
                    )}
                  </div>
                  <div className="text-sm text-gray-600">
                    {selectedReview.reviewer.email} • {selectedReview.jobTitle}{" "}
                    at {selectedReview.company}
                  </div>
                </div>
                <div className="text-right">
                  <Badge className={getStatusBadgeColor(selectedReview.status)}>
                    {selectedReview.status}
                  </Badge>
                  <div className="text-sm text-gray-500 mt-1">
                    Submitted:{" "}
                    {new Date(
                      selectedReview.submittedDate,
                    ).toLocaleDateString()}
                  </div>
                </div>
              </div>

              {/* Review Content */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {renderStars(selectedReview.rating)}
                  </div>
                  <span className="font-medium">{selectedReview.rating}/5</span>
                  <Badge
                    className={getCategoryBadgeColor(selectedReview.category)}
                    variant="secondary"
                  >
                    {selectedReview.category}
                  </Badge>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    {selectedReview.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {selectedReview.content}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-green-800 mb-2">Pros</h4>
                    <p className="text-gray-700">{selectedReview.pros}</p>
                  </div>
                  <div className="p-4 bg-red-50 rounded-lg">
                    <h4 className="font-medium text-red-800 mb-2">Cons</h4>
                    <p className="text-gray-700">{selectedReview.cons}</p>
                  </div>
                </div>
              </div>

              {/* Moderation Section */}
              <div className="border-t pt-6">
                <h4 className="font-medium mb-4">Moderation Actions</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Moderation Note
                    </label>
                    <Textarea
                      value={moderationNote}
                      onChange={(e) => setModerationNote(e.target.value)}
                      placeholder="Add a note about your moderation decision..."
                      rows={3}
                    />
                  </div>
                  <div className="flex gap-3">
                    <Button className="bg-green-600 hover:bg-green-700">
                      <Check className="h-4 w-4 mr-2" />
                      Approve Review
                    </Button>
                    <Button
                      variant="outline"
                      className="text-red-600 hover:text-red-700"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Reject Review
                    </Button>
                    <Button
                      variant="outline"
                      className="text-orange-600 hover:text-orange-700"
                    >
                      <Flag className="h-4 w-4 mr-2" />
                      Flag for Further Review
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button variant="outline" onClick={handleCloseModal}>
                  Close
                </Button>
                <Button>
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Contact Reviewer
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
