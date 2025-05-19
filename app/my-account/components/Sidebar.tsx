"use client";
import Link from "next/link";
import { FC } from "react";
import { usePathname } from "next/navigation";

const mainItems = [
  {
    label: "Profile",
    route: "/my-account",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path d="M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4 8 5.79 8 8s1.79 4 4 4z" />
        <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
      </svg>
    ),
  },
  {
    label: "Reviews",
    route: "/my-account/reviews",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path
          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.89 
          1.518 4.674c.3.921-.755 1.688-1.538 1.118L10 15.347l-3.976 2.89c-.783.57-1.838-.197-1.538-1.118l1.518-4.674
          -3.976-2.89c-.783-.57-.38-1.81.588-1.81h4.915l1.518-4.674z"
        />
      </svg>
    ),
  },
  {
    label: "Payments",
    route: "/my-account/payments",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
      >
        <path d="M6 4h12v16l-6-4-6 4z" />
      </svg>
    ),
  },
];

const SidebarMenu: FC = () => {
  const pathname = usePathname();
  return (
    <aside className="w-full max-w-xs p-4 text-sm text-gray-800">
      <div className="space-y-1">
        {mainItems.map(({ label, icon, route }) => {
          const active = route === pathname;
          return (
            <Link
              href={route}
              key={label}
              className={`flex items-center px-3 py-2 rounded-sm cursor-pointer ${
                active ? "bg-blue-200 font-medium" : "hover:bg-gray-100"
              }`}
            >
              <div className="w-5 h-5 mr-3 text-gray-700">{icon}</div>
              {label}
            </Link>
          );
        })}
      </div>

      <hr className="my-4 border-gray-200" />
    </aside>
  );
};

export default SidebarMenu;
