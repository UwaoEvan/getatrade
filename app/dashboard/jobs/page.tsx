"use client";

import { useState, useEffect } from "react";
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
import { fetchAllJobs } from "./actions";

interface Job {
  id: string;
  title: string;
  description: string;
  category: string;
  project: string;
  createdAt: Date;
  closedAt: Date | null;
  active: boolean | null;
  location: string;
  userId: number;
  price: number | null;
  interested: number | null;
  shortlisted: number | null;
}

export default function AdminJobsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit" | "view">("add");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [jobs, setJobs] = useState<Job[]>();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    const jobs = await fetchAllJobs();
    setJobs(jobs);
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "Closed":
        return "bg-red-100 text-red-800 hover:bg-red-100";
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
      selectedJobs.length === jobs?.length
        ? []
        : jobs?.map((job) => job.id) || [],
    );
  };

  const filteredJobs = jobs?.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.project.toLowerCase().includes(searchTerm.toLowerCase());
    const status = job.active ? "Active" : "Closed";
    const matchesStatus =
      statusFilter === "all" ||
      status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-6 space-y-6">
        <div className="flex gap-4">
          <StatsCard
            stat={{
              title: "Total Jobs",
              value: jobs?.length,
              change: "+12% from last month",
              icon: Users,
              color: "bg-blue-100 text-blue-600",
            }}
          />
          <StatsCard
            stat={{
              title: "Inactive Jobs",
              value: 0,
              change: "+12% from last month",
              icon: Users,
              color: "bg-blue-100 text-blue-600",
            }}
          />
        </div>

        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search jobs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {selectedJobs.length > 0 && (
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Bulk Edit ({selectedJobs.length})
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                  >
                    Delete Selected
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>All Jobs ({filteredJobs?.length})</span>
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={selectedJobs.length === jobs?.length}
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
                          selectedJobs.length === filteredJobs?.length &&
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
                  {filteredJobs?.map((job) => (
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
                            </div>
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {job.location}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge
                                className="bg-blue-100 text-blue-800 hover:bg-blue-100"
                                variant="secondary"
                              >
                                Contract
                              </Badge>
                              <span className="text-xs text-green-600 flex items-center gap-1">
                                <DollarSign className="h-3 w-3" />
                                {job.price}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge
                          className={getStatusBadgeColor(
                            job.active ? "Active" : "Closed",
                          )}
                        >
                          {job.active ? "Active" : "Closed"}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {job.interested}
                        </div>
                        <div className="text-xs text-gray-500">interested</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {job.shortlisted}
                        </div>
                        <div className="text-xs text-gray-500">shortlisted</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(job.createdAt).toLocaleDateString()}
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
                <Label htmlFor="project">Project</Label>
                <Input
                  id="project"
                  defaultValue={selectedJob?.project || ""}
                  placeholder="Project"
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
            </div>

            <div className="space-y-2">
              <Label htmlFor="salary">Charges</Label>
              <Input
                id="salary"
                defaultValue={selectedJob?.price || ""}
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

            {modalMode !== "view" && (
              <div className="flex items-center space-x-2">
                <Checkbox id="urgent" defaultChecked={false} />
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
