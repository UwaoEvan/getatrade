"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "@/app/lib/auth";
import Image, { StaticImageData } from "next/image";
import User from "@/public/userGroup.svg";
import userIcon from "@/public/menuicons/user.png";
import info from "@/public/menuicons/info.png";
import file from "@/public/menuicons/document.png";

type MenuItem = {
  label: string;
  route: string;
  icon: StaticImageData;
};

type Section = {
  title?: string;
  items: MenuItem[];
};

type Props = {
  name?: string;
  location?: string;
};

const sections: Section[] = [
  {
    items: [
      {
        label: "Contact details",
        route: "/my-account/contact-details",
        icon: file,
      },
      {
        label: "Manage account",
        route: "/my-account/manage",
        icon: userIcon,
      },
    ],
  },
  {
    title: "Support",
    items: [{ label: "Support centre", route: "#", icon: info }],
  },
];

export default function CustomerMenu({ name, location }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleSignOut() {
    await signOut();
    router.push("/");
  }

  return (
    <aside className="w-full max-w-[240px] p-4 text-sm text-gray-800">
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
        <p className="font-bold break-words">{name}</p>
        <p className="text-xs text-gray-500">{location}</p>
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
                return support ? (
                  <a
                    key={label}
                    href="mailto:info@getatradelinkltd.com"
                    className={`flex items-center gap-2 px-3 py-2 rounded-md ${
                      active
                        ? "bg-blue-200 text-black font-medium"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <span className="text-lg">
                      <Image
                        src={icon}
                        alt="icon"
                        className="w-4 h-4 object-contain"
                      />
                    </span>
                    {label}
                  </a>
                ) : (
                  <Link
                    href={route}
                    key={label}
                    className={`flex items-center gap-2 px-3 py-2 rounded-md ${
                      active
                        ? "bg-blue-200 text-black font-medium"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <span className="text-lg">
                      <Image
                        src={icon}
                        alt="icon"
                        className="w-4 h-4 object-contain"
                      />
                    </span>
                    {label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <form action={handleSignOut}>
        <button className="flex items-center gap-2 mt-6 px-3 py-2 rounded-md text-red-600 hover:bg-red-50">
          <div className="flex items-center">
            <svg
              className="w-5 h-5 mr-2"
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
          </div>
        </button>
      </form>
    </aside>
  );
}
