import { signOut } from "next-auth/react";
import Link from "next/link";

export default function NavItem({
  href,
  label,
  isButton = false,
}: {
  href: string;
  label: string;
  isButton?: boolean;
}) {
  const commonClasses = "hover:underline";
  const buttonClasses =
    "border border-white px-4 py-1 rounded hover:cursor-pointer hover:bg-white hover:text-[#1f0e2b] transition";

  return isButton ? (
    <button
      onClick={() => signOut({ redirectTo: "/" })}
      className={buttonClasses}
    >
      {label}
    </button>
  ) : (
    <Link href={href} className={commonClasses}>
      {label}
    </Link>
  );
}
