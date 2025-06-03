"use client";

import { useState } from "react";
import Sidebar from "./components/Sidebar";
import { Menu } from "lucide-react";

export default function MyAccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="p-4 flex justify-between items-center py-6">
          {/* <h1 className="text-2xl font-bold">My Account</h1> */}
          <button
            className="md:hidden p-2 rounded hover:bg-gray-200"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        <div className="flex flex-col md:flex-row min-h-[60vh] relative">
          {isSidebarOpen && (
            <div className="fixed inset-0 bg-white z-50 p-4 md:hidden overflow-auto">
              <Sidebar onClose={() => setIsSidebarOpen(false)} />
            </div>
          )}

          <div className="hidden md:block">
            <Sidebar />
          </div>

          <main className="px-4">{children}</main>
        </div>
      </div>
    </div>
  );
}
