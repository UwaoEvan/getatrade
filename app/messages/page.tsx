"use client";

import { useState, useEffect } from "react";
import Messaging from "../my-jobs/[id]/messaging/component/messaging";
import { useSearchParams } from "next/navigation";
import JobInfo from "./JobInfo";

interface User {
  id: number;
  username: string;
  phoneNumber: string;
  email: string;
  avatar?: string;
}

export default function Page() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [otherUser, setOtherUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const targetUserId = searchParams.get("target");
  const currentUserId = searchParams.get("from");

  useEffect(() => {
    initializeUsers();
  }, []);

  const initializeUsers = async () => {
    try {
      // Fetch all users
      const response = await fetch("/api/users");
      if (response.ok) {
        const fetchedUsers = await response.json();

        const targetUser = fetchedUsers.find(
          (u: User) => u.id === parseInt(targetUserId as string),
        );
        const you = fetchedUsers.find(
          (u: User) => u.id === parseInt(currentUserId as string),
        );

        if (targetUser && you) {
          setCurrentUser(you);
          setOtherUser(targetUser);
        }
      }
    } catch (error) {
      console.error("Error initializing users:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Setting up messaging...</div>
      </div>
    );
  }

  if (!currentUser || !otherUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-red-500">Error: Could not initialize users</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto md:flex">
        <div className="w-full md:w-[60%]">
          <div>
            <div className="mb-4 text-center text-sm text-gray-600">
              Chatting as:{" "}
              <span className="font-semibold">{currentUser.username}</span> with{" "}
              <span className="font-semibold">{otherUser.username}</span>
            </div>

            <Messaging
              currentUserId={currentUser.id}
              otherUserId={otherUser.id}
            />
          </div>
        </div>
        <JobInfo user={otherUser} />
      </div>
    </div>
  );
}
