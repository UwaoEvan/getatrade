"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Eye,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

interface VerificationRecord {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  documentType: string;
  status: "submitted" | "pending" | "verified" | "rejected";
  submittedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  files: {
    front: string;
    back?: string;
  };
}

export default function Page() {
  const [verifications, setVerifications] = useState<VerificationRecord[]>([]);
  const [filteredVerifications, setFilteredVerifications] = useState<
    VerificationRecord[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [documentTypeFilter, setDocumentTypeFilter] = useState("all");

  useEffect(() => {
    fetchVerifications();
  }, []);

  useEffect(() => {
    filterVerifications();
  }, [verifications, searchTerm, statusFilter, documentTypeFilter]);

  const fetchVerifications = async () => {
    try {
      const response = await fetch("/api/verifications");
      if (response.ok) {
        const data = await response.json();
        setVerifications(data);
      }
    } catch (error) {
      console.error("Failed to fetch verifications:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterVerifications = () => {
    let filtered = verifications;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (v) =>
          v.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          v.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
          v.id.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((v) => v.status === statusFilter);
    }

    // Document type filter
    if (documentTypeFilter !== "all") {
      filtered = filtered.filter((v) => v.documentType === documentTypeFilter);
    }

    setFilteredVerifications(filtered);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-600" />;
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-blue-600" />;
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
        <div className="flex items-center space-x-1">
          {getStatusIcon(status)}
          <span>{status.charAt(0).toUpperCase() + status.slice(1)}</span>
        </div>
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

  const pendingCount = verifications.filter(
    (v) => v.status === "submitted" || v.status === "pending",
  ).length;
  const verifiedCount = verifications.filter(
    (v) => v.status === "verified",
  ).length;
  const rejectedCount = verifications.filter(
    (v) => v.status === "rejected",
  ).length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-24 bg-gray-200 rounded"></div>
              ))}
            </div>
            <div className="h-96 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Verification Management
          </h1>
          <p className="text-gray-600 mt-2">
            Review and manage user document verifications
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Submissions
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {verifications.length}
                  </p>
                </div>
                <AlertCircle className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Pending Review
                  </p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {pendingCount}
                  </p>
                </div>
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Verified</p>
                  <p className="text-2xl font-bold text-green-600">
                    {verifiedCount}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Rejected</p>
                  <p className="text-2xl font-bold text-red-600">
                    {rejectedCount}
                  </p>
                </div>
                <XCircle className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by name, email, or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="submitted">Submitted</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="verified">Verified</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={documentTypeFilter}
                onValueChange={setDocumentTypeFilter}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by document type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Document Types</SelectItem>
                  <SelectItem value="passport">Passport</SelectItem>
                  <SelectItem value="drivers-license">
                    Driver&apos;s License
                  </SelectItem>
                  <SelectItem value="national-id">National ID</SelectItem>
                  <SelectItem value="state-id">State ID</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                onClick={() => window.location.reload()}
              >
                <Filter className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Verifications Table */}
        <Card>
          <CardHeader>
            <CardTitle>Verification Requests</CardTitle>
            <CardDescription>
              {filteredVerifications.length} of {verifications.length}{" "}
              verifications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Document Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead>Reviewed By</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredVerifications.map((verification) => (
                    <TableRow key={verification.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">
                            {verification.userName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {verification.userEmail}
                          </div>
                          <div className="text-xs text-gray-400">
                            ID: {verification.id}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {getDocumentTypeLabel(verification.documentType)}
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(verification.status)}
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {new Date(
                            verification.submittedAt,
                          ).toLocaleDateString()}
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date(
                            verification.submittedAt,
                          ).toLocaleTimeString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        {verification.reviewedBy ? (
                          <div>
                            <div className="text-sm">
                              {verification.reviewedBy}
                            </div>
                            {verification.reviewedAt && (
                              <div className="text-xs text-gray-500">
                                {new Date(
                                  verification.reviewedAt,
                                ).toLocaleDateString()}
                              </div>
                            )}
                          </div>
                        ) : (
                          <span className="text-gray-400">Not reviewed</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Link
                          href={`/dashboard/verifications/${verification.id}`}
                        >
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-2" />
                            Review
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {filteredVerifications.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500">
                    No verifications found matching your criteria.
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
