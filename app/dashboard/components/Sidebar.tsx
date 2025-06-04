"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import User from "@/public/userGroup.svg";
import { Briefcase, ChartPieIcon, LayoutDashboard, Star } from "lucide-react";
import { signOut } from "@/app/lib/auth";

type MenuItem = {
  label: string;
  route: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
};

type Section = {
  title?: string;
  items: MenuItem[];
};

type Props = {
  name?: string;
  location?: string;
  onClose?: () => void; // Optional close function for mobile toggle
};

const sections: Section[] = [
  {
    items: [
      {
        label: "Users",
        route: "/dashboard",
        icon: <LayoutDashboard />,
      },
      {
        label: "Jobs Management",
        route: "/dashboard/jobs",
        icon: <Briefcase />,
      },
      {
        label: "Reviews",
        route: "/dashboard/reviews",
        icon: <Star />,
      },
      {
        label: "Payments Report",
        route: "/dashboard/payments",
        icon: <ChartPieIcon />,
      },
    ],
  },
];

export default function Sidebar({ onClose }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleSignOut() {
    await signOut();
    router.push("/");
  }

  return (
    <aside className="w-full md:w-[100px] lg:w-[240px] h-full p-4 text-sm text-gray-800  relative z-50">
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 md:hidden p-2 text-gray-600 hover:text-black"
        >
          ✕
        </button>
      )}

      <div className="mb-6 text-center max-w-xs mx-auto">
        <div className="flex justify-center mb-2">
          <Image
            src={User}
            alt="Profile"
            width={60}
            height={60}
            className="rounded-full"
          />
        </div>
        <p className="font-bold break-words">Admin</p>
        <p className="text-xs text-gray-500">{"Unknown location"}</p>
      </div>

      <nav className="space-y-6">
        {sections.map((section, idx) => (
          <div key={idx}>
            {section.title && (
              <p className="md:hidden text-xs uppercase font-medium text-gray-400 mb-1 px-2">
                {section.title}
              </p>
            )}
            <div className="space-y-1">
              {section.items.map(({ label, route, icon }) => {
                const active = pathname === route;
                const support = label === "Support centre";

                const linkClass = `flex items-center gap-2 px-3 py-2 rounded-md transition ${
                  active
                    ? "bg-blue-200 text-black font-medium"
                    : "hover:bg-gray-100"
                }`;

                const content = (
                  <>
                    {icon}
                    <span className="md:hidden lg:inline">{label}</span>
                  </>
                );

                return support ? (
                  <a
                    key={label}
                    href="mailto:info@getatradelinkltd.com"
                    className={linkClass}
                  >
                    {content}
                  </a>
                ) : (
                  <Link href={route} key={label} className={linkClass}>
                    {content}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <form action={handleSignOut} className="mt-6">
        <button className="flex items-center gap-2 w-full px-3 py-2 rounded-md text-red-600 hover:bg-red-50">
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 16l4-4m0 0l-4-4m4 4H9m4 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1"
            />
          </svg>
          <span className="md:hidden lg:inline">Sign Out</span>
        </button>
      </form>
    </aside>
  );
}
