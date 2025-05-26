"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import Profile from "./Profile";
import Review from "./Reviews";
import Messages from "./Messages";

type Props = {
  userId?: number;
  about?: string;
  role?: string;
};

export default function TabSelector({ userId, about, role }: Props) {
  const [activeTab, setActiveTab] = useState("profile");
  return (
    <div>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-transparent border-b border-b-gray-200 rounded-none h-auto p-0">
          <TabsTrigger
            value="profile"
            className="data-[state=active]:border-b-2 data-[state=active]:border-b-blue-400 data-[state=active]:bg-transparent rounded-none pb-3 font-medium"
          >
            Profile
          </TabsTrigger>
          <TabsTrigger
            value="reviews"
            className="data-[state=active]:border-b-2 data-[state=active]:border-b-blue-400 data-[state=active]:bg-transparent rounded-none pb-3 font-medium"
          >
            Reviews
          </TabsTrigger>
          <TabsTrigger
            value="messages"
            className="data-[state=active]:border-b-2 data-[state=active]:border-b-blue-400 data-[state=active]:bg-transparent rounded-none pb-3 font-medium"
          >
            Messages
          </TabsTrigger>
        </TabsList>
        <Profile value="profile" about={about} role={role} userId={userId} />
        <Review value="reviews" userId={userId} />
        <Messages value="messages" />
      </Tabs>
    </div>
  );
}
