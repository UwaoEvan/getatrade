"use client";

import { useState } from "react";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  MoreHorizontal,
  Users,
  Briefcase,
  TrendingUp,
  Calendar,
  MapPin,
  Building2,
  DollarSign,
  Pause,
  Play,
  Copy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import StatsCard from "../components/StatsCard";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Remote";
  salary: string;
  description: string;
  requirements: string[];
  status: "Active" | "Paused" | "Closed" | "Draft";
  applications: number;
  views: number;
  postedDate: string;
  expiryDate: string;
  urgent: boolean;
}

const jobs: Job[] = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$120,000 - $150,000",
    description:
      "We're looking for an experienced Frontend Developer to join our dynamic team.",
    requirements: [
      "5+ years React experience",
      "TypeScript proficiency",
      "UI/UX design skills",
    ],
    status: "Active",
    applications: 24,
    views: 156,
    postedDate: "2024-01-15",
    expiryDate: "2024-02-15",
    urgent: true,
  },
  {
    id: "2",
    title: "Product Manager",
    company: "StartupXYZ",
    location: "New York, NY",
    type: "Full-time",
    salary: "$90,000 - $120,000",
    description: "Join our fast-growing startup as a Product Manager.",
    requirements: [
      "3+ years PM experience",
      "Agile methodology",
      "Data analysis skills",
    ],
    status: "Active",
    applications: 18,
    views: 89,
    postedDate: "2024-01-10",
    expiryDate: "2024-02-10",
    urgent: false,
  },
  {
    id: "3",
    title: "UX/UI Designer",
    company: "Design Studio Pro",
    location: "Remote",
    type: "Remote",
    salary: "$70,000 - $95,000",
    description:
      "We're seeking a creative UX/UI Designer to create intuitive user experiences.",
    requirements: [
      "Figma expertise",
      "User research experience",
      "Portfolio required",
    ],
    status: "Paused",
    applications: 31,
    views: 203,
    postedDate: "2024-01-08",
    expiryDate: "2024-02-08",
    urgent: false,
  },
  {
    id: "4",
    title: "Backend Engineer",
    company: "CloudTech Solutions",
    location: "Austin, TX",
    type: "Full-time",
    salary: "$100,000 - $130,000",
    description:
      "Looking for a skilled Backend Engineer to build scalable APIs.",
    requirements: ["Node.js/Python", "AWS/Azure experience", "Database design"],
    status: "Draft",
    applications: 0,
    views: 12,
    postedDate: "2024-01-12",
    expiryDate: "2024-02-12",
    urgent: false,
  },
  {
    id: "5",
    title: "Marketing Specialist",
    company: "Growth Marketing Co.",
    location: "Chicago, IL",
    type: "Part-time",
    salary: "$25 - $35/hour",
    description:
      "Join our marketing team to drive growth through digital campaigns.",
    requirements: [
      "Digital marketing experience",
      "Content creation",
      "Analytics tools",
    ],
    status: "Closed",
    applications: 45,
    views: 234,
    postedDate: "2023-12-20",
    expiryDate: "2024-01-20",
    urgent: false,
  },
];

const stats = [
  {
    title: "Total Jobs",
    value: "127",
    change: "+12% from last month",
    trend: "up",
    icon: Briefcase,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Active Jobs",
    value: "89",
    change: "+8% from last month",
    trend: "up",
    icon: TrendingUp,
    color: "bg-green-100 text-green-600",
  },
];

export default function AdminJobsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit" | "view">("add");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "Paused":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      case "Closed":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      case "Draft":
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  const getJobTypeBadgeColor = (type: string) => {
    switch (type) {
      case "Full-time":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100";
      case "Part-time":
        return "bg-purple-100 text-purple-800 hover:bg-purple-100";
      case "Contract":
        return "bg-orange-100 text-orange-800 hover:bg-orange-100";
      case "Remote":
        return "bg-teal-100 text-teal-800 hover:bg-teal-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  const handleOpenModal = (mode: "add" | "edit" | "view", job?: Job) => {
    setModalMode(mode);
    setSelectedJob(job || null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
  };

  const handleSelectJob = (jobId: string) => {
    setSelectedJobs((prev) =>
      prev.includes(jobId)
        ? prev.filter((id) => id !== jobId)
        : [...prev, jobId],
    );
  };

  const handleSelectAll = () => {
    setSelectedJobs(
      selectedJobs.length === jobs.length ? [] : jobs.map((job) => job.id),
    );
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      job.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50 max-w-2xl">
      <div className="border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Job Management
              </h1>
              <p className="text-gray-600 mt-1">
                Manage and monitor all job postings
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        <div className="md:flex gap-4">
          {stats.map((stat, index) => (
            <StatsCard key={index} stat={stat} />
          ))}
        </div>

        {/* Jobs Table */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>All Jobs ({filteredJobs.length})</span>
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={selectedJobs.length === jobs.length}
                  onCheckedChange={handleSelectAll}
                />
                <span className="text-sm text-gray-500">Select All</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <Checkbox
                        checked={
                          selectedJobs.length === filteredJobs.length &&
                          filteredJobs.length > 0
                        }
                        onCheckedChange={handleSelectAll}
                      />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Job Details
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Interested
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Shortlisted
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Posted Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredJobs.map((job) => (
                    <tr key={job.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Checkbox
                          checked={selectedJobs.includes(job.id)}
                          onCheckedChange={() => handleSelectJob(job.id)}
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Building2 className="h-5 w-5 text-blue-600" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-sm font-medium text-gray-900 truncate">
                                {job.title}
                              </h3>
                              {job.urgent && (
                                <Badge className="bg-red-100 text-red-800 hover:bg-red-100 text-xs">
                                  Urgent
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                              <span className="flex items-center gap-1">
                                <Building2 className="h-3 w-3" />
                                {job.company}
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {job.location}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge
                                className={getJobTypeBadgeColor(job.type)}
                                variant="secondary"
                              >
                                {job.type}
                              </Badge>
                              <span className="text-xs text-green-600 flex items-center gap-1">
                                <DollarSign className="h-3 w-3" />
                                {job.salary}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge className={getStatusBadgeColor(job.status)}>
                          {job.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {job.applications}
                        </div>
                        <div className="text-xs text-gray-500">interested</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {job.views}
                        </div>
                        <div className="text-xs text-gray-500">shortlisted</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(job.postedDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => handleOpenModal("view", job)}
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modal for Add/Edit/View Job */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {modalMode === "add" && "Post New Job"}
              {modalMode === "edit" && "Edit Job"}
              {modalMode === "view" && "Job Details"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Job Title</Label>
                <Input
                  id="title"
                  defaultValue={selectedJob?.title || ""}
                  placeholder="e.g. Senior Frontend Developer"
                  disabled={modalMode === "view"}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  defaultValue={selectedJob?.company || ""}
                  placeholder="Company name"
                  disabled={modalMode === "view"}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  defaultValue={selectedJob?.location || ""}
                  placeholder="e.g. San Francisco, CA"
                  disabled={modalMode === "view"}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Job Type</Label>
                <Select
                  defaultValue={selectedJob?.type || ""}
                  disabled={modalMode === "view"}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select job type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Full-time">Full-time</SelectItem>
                    <SelectItem value="Part-time">Part-time</SelectItem>
                    <SelectItem value="Contract">Contract</SelectItem>
                    <SelectItem value="Remote">Remote</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="salary">Salary Range</Label>
              <Input
                id="salary"
                defaultValue={selectedJob?.salary || ""}
                placeholder="e.g. $80,000 - $120,000"
                disabled={modalMode === "view"}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Job Description</Label>
              <Textarea
                id="description"
                defaultValue={selectedJob?.description || ""}
                placeholder="Describe the role, responsibilities, and what you're looking for..."
                rows={4}
                disabled={modalMode === "view"}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="requirements">Requirements (one per line)</Label>
              <Textarea
                id="requirements"
                defaultValue={selectedJob?.requirements.join("\n") || ""}
                placeholder="List the key requirements and qualifications..."
                rows={3}
                disabled={modalMode === "view"}
              />
            </div>

            {modalMode !== "view" && (
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="urgent"
                  defaultChecked={selectedJob?.urgent || false}
                />
                <Label htmlFor="urgent">Mark as urgent</Label>
              </div>
            )}

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={handleCloseModal}>
                {modalMode === "view" ? "Close" : "Cancel"}
              </Button>
              {modalMode !== "view" && (
                <Button className="bg-blue-600 hover:bg-blue-700">
                  {modalMode === "add" ? "Post Job" : "Update Job"}
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
