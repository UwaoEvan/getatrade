"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { showInterest } from "../../actions";

type Props = {
  jobId?: string;
  email?: string;
};

const initialState = { error: undefined, success: false };
export default function ShortlistFee({ email, jobId }: Props) {
  const [state, formAction] = useActionState(showInterest, initialState);
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      router.push(`/newleads/${jobId}`);
    }
  }, [state]);

  return (
    <div className="w-full border-1 border-gray-200 p-4 rounded-lg">
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
          className="bg-[#2f76d9] w-full text-white px-6 py-2 rounded-md hover:cursor-pointer transition"
        >
          Express interest
        </button>
        {state?.error && <p className="text-red-500">{state.error}</p>}
        {state?.success && (
          <p className="text-green-600">Sent successfully! 🎉</p>
        )}
      </form>
    </div>
  );
}
