"use client";

import { showInterest } from "@/app/lib/actions";
import { useActionState } from "react";

type Props = {
  jobId?: string;
  email?: string;
};

const initialState = { error: undefined, success: false };
export default function ShortlistFee({ email, jobId }: Props) {
  const [state, formAction] = useActionState(showInterest, initialState);
  return (
    <div className="bg-white shadow-md p-2 mt-6 md:mx-4 h-fit w-full md:w-lg">
      <p className="font-bold">Shortlist fee</p>
      <p className="text-[#2f76d9] font-bold">￡9.00 + VAT</p>
      <div className="p-2 bg-gray-200 my-4">
        <p className="font-bold">￡ Expressing interest is free</p>
        <p className="text-sm font-medium">
          You only pay a fee if the customer shortlists you.
        </p>
      </div>
      <form action={formAction}>
        <input type="hidden" name="jobId" value={jobId} />
        <input type="hidden" name="email" value={email} />
        <button
          type="submit"
          className="bg-blue-600 w-full text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Show Interest
        </button>
        {state?.error && <p className="text-red-500">{state.error}</p>}
        {state?.success && (
          <p className="text-green-600">Sent successfully! 🎉</p>
        )}
      </form>
    </div>
  );
}
