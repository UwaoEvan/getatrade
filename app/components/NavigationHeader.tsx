"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import logo from "@/public/logo.png";

interface NavigationHeaderProps {
  isLoggedIn: boolean;
}

export default function NavigationHeader({
  isLoggedIn,
}: NavigationHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  return (
    <div className="bg-[#2f76d9] text-white">
      <div className="w-full px-4 lg:w-[880px] lg:mx-auto flex items-center justify-between py-4">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => router.push("/")}
        >
          <Image src={logo} alt="logo" className="h-[80px] w-[200px]" />
        </div>

        <div className="hidden md:flex items-center space-x-6 text-sm">
          {isLoggedIn ? (
            <>
              {/* <Link
                href="/new-leads"
                className="hover:underline text-purple-300"
              >
                New leads
              </Link>
              <Link href="/interested" className="hover:underline">
                Interested
              </Link>
              <Link href="/contacts" className="hover:underline">
                Contacts
              </Link> */}
              <div className="relative">
                <button className="border border-white px-4 py-1 rounded hover:bg-white hover:text-[#1f0e2b] transition">
                  My account
                </button>
              </div>
            </>
          ) : (
            <>
              <Link href="/post-a-job" className="hover:underline">
                Post a job
              </Link>
              <button
                onClick={() => router.push("/login")}
                className="hover:underline"
              >
                Log in
              </button>
              <button
                onClick={() => router.push("/tradesworks-signup")}
                className="border border-white px-4 py-1 rounded hover:bg-white hover:text-[#1f0e2b] transition"
              >
                Sign up as a tradesperson
              </button>
            </>
          )}
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
        <div className="md:hidden bg-[#2f76d9] px-4 pb-4 space-y-4 text-sm">
          {isLoggedIn ? (
            <>
              {/* <Link href="/new-leads" className="block w-full hover:underline">
                New leads
              </Link>
              <Link href="/interested" className="block w-full hover:underline">
                Interested
              </Link>
              <Link href="/contacts" className="block w-full hover:underline">
                Contacts
              </Link> */}
              <button className="w-full text-left border border-white px-4 py-2 rounded hover:bg-white hover:text-[#1f0e2b] transition">
                My account
              </button>
            </>
          ) : (
            <>
              <Link href="/post-a-job" className="block w-full hover:underline">
                Post a job
              </Link>
              <button
                onClick={() => router.push("/login")}
                className="block w-full hover:underline"
              >
                Log in
              </button>
              <button
                onClick={() => router.push("/tradesworks-signup")}
                className="block w-full border border-white px-4 py-2 rounded hover:bg-white hover:text-[#1f0e2b] transition"
              >
                Sign up as a tradesperson
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
