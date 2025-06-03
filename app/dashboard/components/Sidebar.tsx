"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image, { StaticImageData } from "next/image";
import User from "@/public/userGroup.svg";
import userIcon from "@/public/menuicons/user.png";
import file from "@/public/menuicons/document.png";
import {
  Briefcase,
  ChartPieIcon,
  Currency,
  LayoutDashboard,
  Star,
} from "lucide-react";

type MenuItem = {
  label: string;
  route: string;
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
        label: "Dashboard",
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

export default function Sidebar({ name, location, onClose }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleSignOut() {
    // await signOut();
    router.push("/");
  }

  return (
    <aside className="w-full md:w-[240px] h-full p-4 text-sm text-gray-800  relative z-50">
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
              <p className="text-xs uppercase font-medium text-gray-400 mb-1 px-2">
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
                    <span>{label}</span>
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

      <form action={handleSignOut} className="mt-6 px-2">
        <button className="flex items-center gap-2 w-full px-3 py-2 rounded-md text-red-600 hover:bg-red-50">
          <svg
            className="w-5 h-5"
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
          Sign Out
        </button>
      </form>
    </aside>
  );
}
