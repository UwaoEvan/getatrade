"use client";

import type React from "react";

import { useState } from "react";
import {
  Plus,
  Users,
  UserCheck,
  UserX,
  Download,
  Printer,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import StatsCard from "./components/StatsCard";

interface Member {
  id: string;
  name: string;
  memberId: string;
  email: string;
  phone: string;
  status: "Active" | "New" | "Inactive";
  ministry: string;
  joinDate: string;
  initials: string;
}

const members: Member[] = [
  {
    id: "1",
    name: "John Doe",
    memberId: "GC-1001",
    email: "john.doe@example.com",
    phone: "(555) 123-4567",
    status: "Active",
    ministry: "Worship Team, Men's Ministry",
    joinDate: "Jan 15, 2020",
    initials: "JD",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    memberId: "GC-1002",
    email: "sarah.j@example.com",
    phone: "(555) 987-6543",
    status: "Active",
    ministry: "Children's Ministry",
    joinDate: "Mar 22, 2019",
    initials: "SJ",
  },
  {
    id: "3",
    name: "Michael Brown",
    memberId: "GC-1003",
    email: "michael.b@example.com",
    phone: "(555) 456-7890",
    status: "New",
    ministry: "Not Assigned",
    joinDate: "Jun 5, 2023",
    initials: "MB",
  },
  {
    id: "4",
    name: "Emily Wilson",
    memberId: "GC-1004",
    email: "emily.w@example.com",
    phone: "(555) 789-0123",
    status: "Inactive",
    ministry: "Women's Ministry",
    joinDate: "Aug 12, 2021",
    initials: "EW",
  },
  {
    id: "5",
    name: "Robert Miller",
    memberId: "GC-1005",
    email: "robert.m@example.com",
    phone: "(555) 234-5678",
    status: "Active",
    ministry: "Outreach, Men's Ministry",
    joinDate: "Nov 30, 2018",
    initials: "RM",
  },
];

const stats = [
  {
    title: "Total Members",
    value: "1,248",
    change: "+12% from last month",
    trend: "up",
    icon: Users,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Active Members",
    value: "892",
    change: "+8% from last month",
    trend: "up",
    icon: UserCheck,
    color: "bg-green-100 text-green-600",
  },
  // {
  //   title: "New This Month",
  //   value: "42",
  //   change: "-3% from last month",
  //   trend: "down",
  //   icon: UserPlus,
  //   color: "bg-purple-100 text-purple-600",
  // },
  {
    title: "Inactive Members",
    value: "156",
    change: "+5% from last month",
    trend: "up",
    icon: UserX,
    color: "bg-yellow-100 text-yellow-600",
  },
];

export default function Page() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit" | "delete">("add");
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [formData, setFormData] = useState({
    username: "",
    role: "",
    password: "",
  });

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "New":
        return "bg-purple-100 text-purple-800 hover:bg-purple-100";
      case "Inactive":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  const handleOpenModal = (
    mode: "add" | "edit" | "delete",
    member?: Member,
  ) => {
    setModalMode(mode);
    setSelectedMember(member || null);
    if (mode === "edit" && member) {
      setFormData({
        username: member.name,
        role: member.ministry.split(",")[0].trim(),
        password: "",
      });
    } else {
      setFormData({
        username: "",
        role: "",
        password: "",
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMember(null);
    setFormData({
      username: "",
      role: "",
      password: "",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission based on modalMode
    console.log("Form submitted:", {
      mode: modalMode,
      data: formData,
      member: selectedMember,
    });
    handleCloseModal();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="max-w-2xl mx-auto  space-y-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="relative flex-1 max-w-md"></div>
        <div className="flex gap-2">
          <Button
            className="bg-green-600 hover:bg-green-700"
            onClick={() => handleOpenModal("add")}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Member
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="flex gap-4">
        {stats.map((stat, index) => (
          <StatsCard key={index} stat={stat} />
        ))}
      </div>

      {/* Members Table */}
      <Card className="bg-white">
        <CardContent className="p-0">
          <div className="p-6 border-b">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-xl font-semibold text-gray-900">
                All Members
              </h2>
              <div className="flex items-center gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Printer className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Member
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ministry
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Join Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {members.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Avatar className="h-10 w-10 bg-blue-100">
                          <AvatarFallback className="text-blue-600 font-medium">
                            {member.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {member.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            Member ID: {member.memberId}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {member.email}
                      </div>
                      <div className="text-sm text-gray-500">
                        {member.phone}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge className={getStatusBadgeColor(member.status)}>
                        {member.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {member.ministry}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {member.joinDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-yellow-600 hover:text-yellow-800"
                          onClick={() => handleOpenModal("edit", member)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-800"
                          onClick={() => handleOpenModal("delete", member)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {modalMode === "add" && "Add New Member"}
              {modalMode === "edit" && "Edit Member"}
              {modalMode === "delete" && "Delete Member"}
            </DialogTitle>
          </DialogHeader>

          {modalMode === "delete" ? (
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Are you sure you want to delete{" "}
                <strong>{selectedMember?.name}</strong>? This action cannot be
                undone.
              </p>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={handleCloseModal}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={handleSubmit}>
                  Delete Member
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={formData.username}
                  onChange={(e) =>
                    handleInputChange("username", e.target.value)
                  }
                  placeholder="Enter username"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select
                  value={formData.role}
                  onValueChange={(value) => handleInputChange("role", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Worship Team">Worship Team</SelectItem>
                    <SelectItem value="Children's Ministry">
                      Children's Ministry
                    </SelectItem>
                    <SelectItem value="Men's Ministry">
                      Men's Ministry
                    </SelectItem>
                    <SelectItem value="Women's Ministry">
                      Women's Ministry
                    </SelectItem>
                    <SelectItem value="Outreach">Outreach</SelectItem>
                    <SelectItem value="Youth Ministry">
                      Youth Ministry
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  placeholder="Enter password"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCloseModal}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700"
                >
                  {modalMode === "add" ? "Add Member" : "Update Member"}
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
