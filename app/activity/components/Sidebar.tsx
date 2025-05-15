"use client";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();
  const routes = [
    {
      id: 1,
      name: "Interested",
      caption: "Waiting for the customer to reply to you",
      icon: "🕒",
      path: "/activity",
    },
    {
      id: 2,
      name: "Shortlisted",
      caption: "Discuss job details and your quote",
      icon: "💬",
      path: "/activity/shortlisted",
    },
    {
      id: 3,
      name: "Hired",
      caption: "Request a review when you finish the job",
      icon: "🤝",
      path: "/activity/hired",
    },
    {
      id: 4,
      name: "Closed",
      caption: "Inactive leads that have closed or hired someone else",
      icon: "✖️",
      path: "/activity/closed",
    },
  ];
  return (
    <div>
      <div className="w-full md:w-62 border-1 border-gray-200 overflow-hidden bg-white mt-6">
        {routes.map((route) => {
          const active = route.path === pathname;
          return (
            <Link
              href={route.path}
              key={route.id}
              className={clsx(
                active && "bg-blue-200 border-r-4 border-blue-400",
                "p-4 hover:cursor-pointer hover:bg-blue-100 block",
              )}
            >
              <div className="flex items-start space-x-2">
                <span>{route.icon}</span>
                <div>
                  <h3 className="font-semibold text-sm">{route.name}</h3>
                  <p className="text-gray-700 text-sm">{route.caption}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
