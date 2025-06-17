"use client";

import { useState, useEffect } from "react";
import {
  ArrowLeft,
  CheckCircle,
  XCircle,
  Download,
  ZoomIn,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import { useParams } from "next/navigation";

interface VerificationDetail {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  documentType: string;
  status: "submitted" | "pending" | "verified" | "rejected";
  submittedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  rejectionReason?: string;
  files: {
    front: string;
    back?: string;
  };
  metadata?: {
    fileSize: number;
    fileType: string;
    originalFilename: string;
  };
}

export default function Page() {
  const [verification, setVerification] = useState<VerificationDetail | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const params = useParams();

  useEffect(() => {
    fetchVerificationDetail();
  }, [params.id]);

  const fetchVerificationDetail = async () => {
    try {
      const response = await fetch(`/api/verifications/${params.id}`);
      if (response.ok) {
        const data = await response.json();
        setVerification(data);
        setRejectionReason(data.rejectionReason || "");
      }
    } catch (error) {
      console.error("Failed to fetch verification detail:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async () => {
    setProcessing(true);
    try {
      const response = await fetch(`/api/verifications/${params.id}/approve`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        fetchVerificationDetail();
      } else {
        throw new Error("Failed to approve verification");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setProcessing(false);
    }
  };

  const handleReject = async () => {
    if (!rejectionReason.trim()) {
      // toast({
      //   title: "Rejection reason required",
      //   description: "Please provide a reason for rejection.",
      //   variant: "destructive",
      // })
      return;
    }

    setProcessing(true);
    try {
      const response = await fetch(
        `/api/admin/verifications/${params.id}/reject`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ reason: rejectionReason }),
        },
      );

      if (response.ok) {
        fetchVerificationDetail();
      } else {
        throw new Error("Failed to reject verification");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setProcessing(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      verified: "bg-green-100 text-green-800 border-green-200",
      rejected: "bg-red-100 text-red-800 border-red-200",
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      submitted: "bg-blue-100 text-blue-800 border-blue-200",
    };

    return (
      <Badge className={variants[status as keyof typeof variants]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getDocumentTypeLabel = (type: string) => {
    const labels = {
      passport: "Passport",
      "drivers-license": "Driver's License",
      "national-id": "National ID",
      "state-id": "State ID",
    };
    return labels[type as keyof typeof labels] || type;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="h-96 bg-gray-200 rounded"></div>
              <div className="h-96 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!verification) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto">
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-gray-500">Verification not found</p>
              <Link href="/admin/verifications">
                <Button className="mt-4">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Verifications
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard/verifications">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Verification Review
              </h1>
              <p className="text-gray-600">ID: {verification.id}</p>
            </div>
          </div>
          {getStatusBadge(verification.status)}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* User Information */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>User Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-gray-600">
                    Name
                  </Label>
                  <p className="text-sm break-words">{verification.userName}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">
                    Email
                  </Label>
                  <p className="text-sm break-words">
                    {verification.userEmail}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">
                    Document Type
                  </Label>
                  <p className="text-sm">
                    {getDocumentTypeLabel(verification.documentType)}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">
                    Submitted
                  </Label>
                  <p className="text-sm">
                    {new Date(verification.submittedAt).toLocaleString()}
                  </p>
                </div>
                {verification.reviewedAt && (
                  <div>
                    <Label className="text-sm font-medium text-gray-600">
                      Reviewed
                    </Label>
                    <p className="text-sm">
                      {new Date(verification.reviewedAt).toLocaleString()}
                    </p>
                    {verification.reviewedBy && (
                      <p className="text-xs text-gray-500">
                        by {verification.reviewedBy}
                      </p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Actions */}
            {(verification.status === "submitted" ||
              verification.status === "pending") && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Review Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="rejection-reason">
                      Rejection Reason (if applicable)
                    </Label>
                    <Textarea
                      id="rejection-reason"
                      placeholder="Provide a clear reason if rejecting..."
                      value={rejectionReason}
                      onChange={(e) => setRejectionReason(e.target.value)}
                      rows={3}
                    />
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      onClick={handleApprove}
                      disabled={processing}
                      className="flex-1"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      {processing ? "Processing..." : "Approve"}
                    </Button>
                    <Button
                      onClick={handleReject}
                      disabled={processing}
                      variant="destructive"
                      className="flex-1"
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      {processing ? "Processing..." : "Reject"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {verification.rejectionReason && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-red-800">
                    Rejection Reason
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-red-700">
                    {verification.rejectionReason}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Document Images</CardTitle>
                <CardDescription>
                  Click on images to view in full size
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="col-span-2">
                    <Label className="text-sm font-medium text-gray-600 mb-2 block">
                      Document
                    </Label>
                    <Dialog>
                      <DialogTitle></DialogTitle>
                      <DialogTrigger asChild>
                        <div className="relative group cursor-pointer">
                          <img
                            src={
                              verification.files.front || "/placeholder.svg?"
                            }
                            alt="Document Front"
                            className="w-full h-64 object-cover rounded-lg border border-gray-200"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 rounded-lg flex items-center justify-center">
                            <ZoomIn className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                          </div>
                        </div>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl">
                        <img
                          src={
                            verification.files.front ||
                            "/placeholder.svg?height=100%&width=800"
                          }
                          alt="Document Front - Full Size"
                          className="w-full h-auto"
                        />
                      </DialogContent>
                    </Dialog>
                    <div className="mt-2 flex space-x-2">
                      <Button size="sm" variant="outline" asChild>
                        <a
                          href={verification.files.front}
                          download
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </a>
                      </Button>
                    </div>
                  </div>

                  {/* {verification.files.back && (
                    <div>
                      <Label className="text-sm font-medium text-gray-600 mb-2 block">
                        Back Side
                      </Label>
                      <Dialog>
                        <DialogTrigger asChild>
                          <div className="relative group cursor-pointer">
                            <img
                              src={
                                verification.files.back ||
                                "/placeholder.svg?height=300&width=400"
                              }
                              alt="Document Back"
                              className="w-full h-64 object-cover rounded-lg border border-gray-200"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 rounded-lg flex items-center justify-center">
                              <ZoomIn className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                            </div>
                          </div>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl">
                          <img
                            src={
                              verification.files.back ||
                              "/placeholder.svg?height=600&width=800"
                            }
                            alt="Document Back - Full Size"
                            className="w-full h-auto"
                          />
                        </DialogContent>
                      </Dialog>
                      <div className="mt-2 flex space-x-2">
                        <Button size="sm" variant="outline" asChild>
                          <a
                            href={verification.files.back}
                            download
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </a>
                        </Button>
                      </div>
                    </div>
                  )} */}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
