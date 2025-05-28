"use client";

import { useState, useEffect } from "react";
import { getUser } from "../lib/actions";
import { auth } from "../lib/auth";
import CustomerMenu from "./components/CustomerMenu";
import TradespersonMenu from "./components/TradespersonMenu";

export default function MyAccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const session = await auth();
      const u = await getUser(session?.user?.email as string);
      setUser(u);
    }
    fetchData();
  }, []);

  if (!user) return <div className="p-4">Loading...</div>;

  const SidebarContent =
    user?.role === "customer" ? (
      <CustomerMenu name={user.username} location={user.location} />
    ) : (
      <TradespersonMenu name={user.username} location={user.location} />
    );

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-6 flex justify-between items-center">
          <h1 className="text-xl md:text-3xl font-bold">My Account</h1>

          <button
            className="md:hidden p-2 rounded text-gray-700 hover:bg-gray-200 underline"
            onClick={() => setSidebarOpen(!isSidebarOpen)}
          >
            Go back
          </button>
        </div>
        <div
          className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:relative md:translate-x-0 md:w-1/3 md:block`}
        >
          <div className="md:hidden flex justify-end p-4">
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-gray-600 hover:text-black"
            >
              ✕
            </button>
          </div>
          {SidebarContent}
        </div>

        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black opacity-30 z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <main className="md:ml-0 md:pl-6 mt-4 md:mt-0">
          <div className="">{children}</div>
        </main>
      </div>
    </div>
  );
}
