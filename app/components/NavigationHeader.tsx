"use client";
import { useState } from "react";
import Image from "next/image";
import logo from "@/public/logo.png";

export default function NavigationHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="bg-[#2f76d9] text-white">
      <div className="w-full px-4 lg:w-[880px] lg:mx-auto flex items-center justify-between py-4">
        <div className="flex items-center">
          <div className="p-1 rounded-full">
            <Image
              src={logo}
              alt="logo"
              className="h-[80px] w-[100px] object-contain"
            />
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <button className="hover:underline">Post a job</button>
          <button className="hover:underline">Log in</button>
          <button className="border border-white px-4 py-1 rounded hover:bg-white hover:text-[#1f0e2b] transition">
            Sign up as a tradesperson
          </button>
        </div>

        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-[#2f76d9] px-4 pb-4 space-y-4">
          <button className="block w-full text-left hover:underline">Post a job</button>
          <button className="block w-full text-left hover:underline">Log in</button>
          <button className="block w-full border border-white px-4 py-2 rounded hover:bg-white hover:text-[#1f0e2b] transition">
            Sign up as a tradesperson
          </button>
        </div>
      )}
    </div>
  );
}
