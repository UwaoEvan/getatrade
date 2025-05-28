"use client";

import { Send } from "lucide-react";
import type React from "react";
import { useState, useEffect, useRef } from "react";

interface User {
  id: number;
  username: string;
  avatar?: string;
}

interface Message {
  id: string;
  content: string;
  createdAt: string;
  read: boolean;
  senderId: number;
  receiverId: number;
  sender: User;
  receiver: User;
}

interface MessagingProps {
  currentUserId?: number;
  otherUserId?: number;
}

export default function Messaging({
  currentUserId,
  otherUserId,
}: MessagingProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [otherUser, setOtherUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchMessages();
    fetchOtherUser();

    const interval = setInterval(fetchMessages, 3000);
    return () => clearInterval(interval);
  }, [currentUserId, otherUserId]);

  const fetchMessages = async () => {
    try {
      const response = await fetch(
        `/api/messages?userId=${currentUserId}&otherUserId=${otherUserId}`,
      );
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchOtherUser = async () => {
    try {
      const response = await fetch(`/api/users`);
      if (response.ok) {
        const users = await response.json();
        const user = users.find((u: User) => u.id === otherUserId);
        setOtherUser(user || null);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newMessage.trim() || sending) return;

    setSending(true);
    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: newMessage.trim(),
          senderId: currentUserId,
          receiverId: otherUserId,
        }),
      });

      if (response.ok) {
        const message = await response.json();
        setMessages((prev) => [...prev, message]);
        setNewMessage("");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setSending(false);
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  if (loading) {
    return (
      <div className="flex flex-col lg:flex-row px-6 font-sans text-sm">
        <div className="flex-1 bg-white rounded-xl border border-gray-200">
          <div className="p-8 text-center text-gray-500">
            Loading messages...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row md:px-4 font-sans text-sm">
      <div className="flex-1 bg-white rounded-xl border border-gray-200">
        <div className="border-b p-4 font-semibold text-base">
          {otherUser?.username || "Unknown User"}
        </div>

        <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
          {messages.map((message, index) => {
            const isCurrentUser = message.senderId === currentUserId;
            const showDate =
              index === 0 ||
              formatDate(messages[index - 1].createdAt) !==
                formatDate(message.createdAt);

            return (
              <div key={message.id}>
                {showDate && (
                  <div className="text-center text-xs text-gray-500 py-2 border-t border-gray-200">
                    {formatDate(message.createdAt)}
                  </div>
                )}

                <div
                  className={`flex items-start ${isCurrentUser ? "justify-end" : ""}`}
                >
                  {!isCurrentUser && (
                    <div className="w-6 h-6 bg-purple-200 text-purple-700 rounded-full text-xs font-bold flex items-center justify-center mr-2">
                      {getInitials(message.sender.username)}
                    </div>
                  )}

                  <div
                    className={`p-3 rounded-md max-w-md ${isCurrentUser ? "bg-purple-50" : "bg-gray-100"}`}
                  >
                    {message.content}
                    <div className="text-gray-400 text-xs text-right mt-1">
                      {isCurrentUser && message.read ? "Read " : ""}
                      {formatTime(message.createdAt)}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        <div className="border-t p-4">
          <form onSubmit={sendMessage} className="flex items-center gap-2">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Your message"
              className="flex-1 border border-gray-300 rounded-md px-4 py-2 text-sm resize-none"
              rows={1}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage(e);
                }
              }}
            />
            <button
              type="submit"
              disabled={!newMessage.trim() || sending}
              className="p-2 rounded-md bg-blue-400 text-white disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Send message"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
