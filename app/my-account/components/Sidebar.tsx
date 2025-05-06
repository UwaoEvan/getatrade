"use client";

import Link from "next/link";
import { useState } from "react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="md:hidden p-4">
        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700">
          {isOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-md transform transition-transform duration-200 z-40
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:block`}
      >
        <div className="p-4">
          <h2 className="text-2xl font-semibold">Profile</h2>
        </div>
        <div className="p-4 ">
          <div className="flex items-center space-x-2">
            <div className="rounded-full bg-gray-400 w-8 h-8 flex items-center justify-center text-white">
              C
            </div>
            <span>Coreen</span>
          </div>
        </div>
        <div className="mt-6 space-y-6">
          <Section title="Account">
            <SidebarLink label="Contact Information" link="/my-account/" />
            <SidebarLink label="Manage account" link="/my-account/manage" />
          </Section>
          <Section title="Settings">
            <SidebarLink label="Notifications" link="#" />
          </Section>
          <Section title="Support">
            <SidebarLink label="Support centre" link="#" />
            <SidebarLink label="Contact us" link="#" />
          </Section>
        </div>
      </div>

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
        />
      )}
    </>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="px-4">
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      <div className="mt-2 space-y-2">{children}</div>
    </div>
  );
}

function SidebarLink({ label, link }: { label: string; link: string }) {
  return (
    <Link href={link} className="block px-4 py-2 rounded hover:bg-gray-200">
      {label}
    </Link>
  );
}

function MenuIcon() {
  return (
    <svg
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
