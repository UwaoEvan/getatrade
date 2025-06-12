"use client";

import Link from "next/link";

type Props = {
  status?: string;
};

export default function UnverifiedInfo({ status }: Props) {
  return (
    <div className="w-full border-1 border-gray-200 p-4 rounded-lg">
      {status === "Not verified" ? (
        <>
          <div className="p-4 bg-yellow-100 border-l-4 border-yellow-400 text-yellow-800 rounded-md mb-4">
            <p className="font-semibold">Account not verified</p>
            <p className="text-sm">
              You need to verify your account before you can express interest in
              jobs.
            </p>
          </div>
          <Link
            href={"/verification"}
            className="bg-amber-600 text-center font-bold block w-full text-white px-6 py-2 rounded-md"
          >
            Verify
          </Link>
        </>
      ) : (
        <>
          <div className="p-4 bg-yellow-100 border-l-4 border-yellow-400 text-yellow-800 rounded-md mb-4">
            <p className="font-semibold">Verification in Progress</p>
            <p className="text-sm">
              Your documents have been submitted and are currently being
              reviewed. You&apos;ll be notified once your account is verified.
            </p>
          </div>
        </>
      )}
    </div>
  );
}
