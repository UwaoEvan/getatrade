"use client";
import Link from "next/link";

type Props = {
  jobId?: string;
  shortlisted?: string;
  amount?: number;
  description?: string;
};

export default function ShortlistFee({
  jobId,
  amount,
  shortlisted,
  description,
}: Props) {
  return (
    <div className="w-full border-1 border-gray-200 p-4 rounded-lg">
      <h2 className="font-semibold mb-2">Message sent</h2>
      <p className="text-sm text-green-700 bg-green-100 p-2 rounded mb-3">
        Congratulations 🎉! You have been shortlisted..
      </p>
      <p className="text-sm text-gray-700 mb-4">
        You&apos;ll be charged <strong>£{amount} + VAT</strong> if the customer
        shortlists you.
      </p>
      <Link
        href={`/checkout?jobId=${jobId}&cost=${amount}&shortlistId=${shortlisted}&description=${description}`}
        type="submit"
        className="bg-[#2f76d9] text-white py-2 px-4 rounded w-full block text-center text-sm"
      >
        Pay
      </Link>
    </div>
  );
}
