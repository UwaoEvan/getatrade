"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";
import NavItem from "./NavItem";

interface NavigationHeaderProps {
  isLoggedIn: boolean;
  role?: string;
  onLogout?: () => void;
}

const navLinks = {
  guest: [
    { href: "/post-a-job", label: "Post a job" },
    { href: "/login", label: "Log in", isButton: false },
    { href: "/tradesworks-signup", label: "Sign up as a tradesperson" },
  ],
  customer: [
    { href: "/my-jobs", label: "My Jobs" },
    { href: "/my-account/contact-details", label: "My account" },
  ],
  tradesperson: [
    { href: "/new-leads", label: "New leads" },
    { href: "/activity", label: "Activity" },
    { href: "/contacts", label: "Contacts" },
    { href: "/my-account", label: "My account" },
  ],
};

export default function NavigationHeader({
  isLoggedIn,
  role,
}: NavigationHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const getNavItems = () => {
    if (!isLoggedIn) return navLinks.guest;
    if (role === "customer") return navLinks.customer;
    return navLinks.tradesperson;
  };

  const navItems = getNavItems();

  return (
    <header className="bg-[#2f76d9] text-white">
      <div className="w-full px-4 lg:w-[880px] lg:mx-auto flex items-center justify-between py-4">
        <Link href="/" className="flex items-center">
          <Image src={logo} alt="logo" className="h-16 w-auto object-contain" />
        </Link>

        <nav className="hidden md:flex items-center space-x-6 text-sm">
          {navItems.map((item) => (
            <NavItem key={item.href} {...item} />
          ))}
        </nav>

        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle menu"
            role="button"
          >
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
        <nav
          id="mobile-menu"
          className="md:hidden bg-[#2f76d9] px-4 pb-4 space-y-4 text-sm"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block w-full hover:underline"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
