"use client";
import Link from "next/link";

type Props = {
  jobId?: string;
  shortlisted?: string;
  email?: string;
  name?: string;
  phoneNumber?: string;
};

export default function ShortlistFee({
  jobId,
  email,
  name,
  phoneNumber,
}: Props) {
  return (
    <div className="w-full border-1 border-gray-200 p-4 rounded-lg">
      <h2 className="font-semibold mb-2">Message sent</h2>
      <p className="text-sm text-green-700 bg-green-100 p-2 rounded mb-3">
        Congratulations 🎉! You have been shortlisted..
      </p>
      <p className="text-sm text-gray-700 mb-4">
        You&apos;ll be charged <strong>£45.00 + VAT</strong> if the customer
        shortlists you.
        <a href="#" className="text-[#2f76d9] underline">
          Learn more
        </a>
      </p>
      <Link
        href={`/checkout?jobId=${jobId}`}
        type="submit"
        className="bg-[#2f76d9] text-white py-2 px-4 rounded w-full block text-center"
      >
        Pay
      </Link>
    </div>
  );
}
