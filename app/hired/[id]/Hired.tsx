"use client";

import Image from "next/image";
import user from "@/public/user.png";
import Email from "@/public/email.png";

type Props = {
  email?: string;
  name?: string;
  phoneNumber?: string;
};

export default function HiredInfo({ email, name }: Props) {
  return (
    <div className="w-full border-1 border-gray-200 p-4 rounded-lg">
      <h2 className="font-semibold mb-2">Contact details shared</h2>
      <p className="text-sm text-green-700 bg-green-100 p-2 rounded mb-3">
        You can now contact the customer.
      </p>
      <div className="space-y-2 text-gray-800 text-base">
        <div className="flex items-center gap-2">
          <Image src={user} alt="user" className="h-4 w-4 object-contain" />
          <span
            className="text-sm truncate max-w-[200px] overflow-hidden whitespace-nowrap"
            title={name}
          >
            {name}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Image src={Email} alt="email" className="h-4 w-4 object-contain" />
          <span
            className="underline hover:text-blue-600 text-sm truncate max-w-[200px] overflow-hidden whitespace-nowrap"
            title={email}
          >
            {email}
          </span>
        </div>
      </div>
    </div>
  );
}
