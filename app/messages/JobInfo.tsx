"use client";

import { useSearchParams } from "next/navigation";

type Props = {
  user: User;
};

interface User {
  id: number;
  username: string;
  phoneNumber: string;
  email: string;
  avatar?: string;
}

export default function JobInfo({ user }: Props) {
  const searchParams = useSearchParams();
  const title = searchParams.get("title");
  const location = searchParams.get("location");
  const time = searchParams.get("time");
  return (
    <div className="w-full md:w-[40%] px-4 mt-4 space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-3">
        <h3 className="font-semibold">Contact details</h3>
        <div className="bg-green-50 text-green-800 p-2 rounded-md text-sm">
          ✅ You&apos;ve been shortlisted for this job
        </div>
        <div className="text-sm">
          📞{" "}
          <a href={user?.phoneNumber || ""} className="underline">
            {user?.phoneNumber}
          </a>
        </div>
        <div className="text-sm">
          📧{" "}
          <a href={user?.email} className="underline">
            {user?.email}
          </a>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-3">
        <h3 className="font-semibold">{title}</h3>
        <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-2 py-1 rounded-full">
          Customer
        </span>
        <div className="text-sm space-y-1 mt-2">
          <p>💬 responses</p>
          <p>⏱ {time}</p>
          <p>
            💷 You&apos;ve been charged <strong>£32</strong> + VAT
          </p>
          <p>📍 {location}</p>
        </div>
      </div>
    </div>
  );
}
