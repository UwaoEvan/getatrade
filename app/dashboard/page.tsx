"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Plus, Users, Eye, Edit, Trash2 } from "lucide-react";
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
import { addUser, deactivateUser, getAllUsers, updateUser } from "./actions";
import { format } from "date-fns";

interface Member {
  id: number;
  role: string | null;
  username: string;
  email: string;
  phoneNumber: string | null;
  firstName: string | null;
  lastName: string | null;
  hashedPassword: string;
  location: string | null;
  about: string | null;
  averageRating: number | null;
  joinDate: Date | null;
  status: string | null;
}

export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit" | "delete">("add");
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [users, setUsers] = useState<Member[]>();
  const inactiveUsers = users?.filter((user) => user.status === "Inactive");
  const [formData, setFormData] = useState({
    username: "",
    role: "",
    password: "",
    email: "",
    phoneNumber: "",
    userId: "",
  });

  useEffect(() => {
    fetchUsers();
  }, [isModalOpen]);

  const fetchUsers = async () => {
    const users = await getAllUsers();
    setUsers(users);
  };

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
        username: member.username,
        role: "",
        password: "",
        email: member.email,
        phoneNumber: member?.phoneNumber as string,
        userId: member.id.toString(),
      });
    } else {
      setFormData({
        username: "",
        role: "",
        password: "",
        email: "",
        phoneNumber: "",
        userId: "",
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
      email: "",
      phoneNumber: "",
      userId: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission based on modalMode
    console.log("Form submitted:", {
      mode: modalMode,
      data: formData,
      member: selectedMember,
    });

    if (modalMode === "add") {
      await addUser(formData);
    } else if (modalMode === "edit") {
      await updateUser(formData);
    } else {
      await deactivateUser(selectedMember?.id || 0);
    }

    handleCloseModal();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="space-y-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="relative flex-1"></div>
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
      <div className="flex gap-2">
        <StatsCard
          stat={{
            title: "Total Users",
            value: users?.length,
            change: "+12% from last month",
            icon: Users,
            color: "bg-blue-100 text-blue-600",
          }}
        />
        <StatsCard
          stat={{
            title: "Inactive Users",
            value: inactiveUsers?.length,
            change: "+12% from last month",
            icon: Users,
            color: "bg-blue-100 text-blue-600",
          }}
        />
      </div>

      <Card className="bg-white">
        <CardContent className="p-0">
          <div className="p-6 border-b">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-xl font-semibold text-gray-900">All Users</h2>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
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
                {users?.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Avatar className="h-10 w-10 bg-blue-100">
                          <AvatarFallback className="text-blue-600 font-medium">
                            {member?.username.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {member.username}
                          </div>
                          <div className="text-sm text-gray-500">
                            ID: {member.id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {member.email}
                      </div>
                      <div className="text-sm text-gray-500">
                        {member.phoneNumber}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge
                        className={getStatusBadgeColor(member?.status || "")}
                      >
                        {member.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {member.role}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {format(new Date(member.joinDate || ""), "dd-MM-yyyy")}
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

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {modalMode === "add" && "Add New Member"}
              {modalMode === "edit" && "Edit Member"}
              {modalMode === "delete" && "Deactivate Member"}
            </DialogTitle>
          </DialogHeader>

          {modalMode === "delete" && (
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Are you sure you want to deactivate{" "}
                <strong>{selectedMember?.username}</strong>? This action cannot
                be undone.
              </p>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={handleCloseModal}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={handleSubmit}>
                  Deactivate Member
                </Button>
              </div>
            </div>
          )}
          {modalMode === "edit" && (
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
                <Label htmlFor="username">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="example@domain.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="username">Phone number</Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) =>
                    handleInputChange("username", e.target.value)
                  }
                  placeholder="Enter username"
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
                  Update User
                </Button>
              </div>
            </form>
          )}
          {modalMode === "add" && (
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
                <Label htmlFor="username">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="example@domain.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="username">Phone number</Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) =>
                    handleInputChange("phoneNumber", e.target.value)
                  }
                  placeholder="UK phone number"
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
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Customer">Customer</SelectItem>
                    <SelectItem value="Tradesperson">Tradesperson</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="username">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  placeholder="password"
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
                  Add User
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
