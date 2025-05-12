"use client";
import Link from "next/link";

type Props = {
  jobId?: string;
};

export default function Shortlist({ jobId }: Props) {
  return (
    <div className="bg-white  mt-6 h-fit w-full md:w-lg">
      <p className="font-bold">Shortlist fee</p>
      <p className="text-[#2f76d9] font-bold">￡9.00 + VAT</p>
      <div className="p-2 bg-gray-200 my-4">
        <p className="font-bold">￡ Expressing interest is free</p>
        <p className="text-sm font-medium">
          You only pay a fee if the customer shortlists you.
        </p>
      </div>
      <Link
        href={`/checkout?jobId=${jobId}`}
        type="submit"
        className="bg-blue-600 block w-full text-center text-white px-6 py-2 rounded-lg hover:cursor-pointer hover:bg-blue-400 transition"
      >
        Pay
      </Link>
    </div>
  );
}
