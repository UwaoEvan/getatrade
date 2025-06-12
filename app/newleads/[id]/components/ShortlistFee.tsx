"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { showInterest } from "../../actions";

type Props = {
  jobId?: string;
  email?: string;
  price?: number;
};

const initialState = { error: undefined, success: false };
export default function ShortlistFee({ email, jobId, price }: Props) {
  const [state, formAction, isPending] = useActionState(
    showInterest,
    initialState,
  );
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      router.push(`/newleads/${jobId}`);
    }
  }, [state]);

  return (
    <div className="w-full border-1 border-gray-200 p-4 rounded-lg">
      <p className="font-bold">Shortlist fee</p>
      <p className="text-[#2f76d9] font-bold">￡{price} + VAT</p>
      <div className="p-2 bg-gray-200 my-4 rounded-sm">
        <p className="font-bold text-sm pb-2">￡ Expressing interest is free</p>
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
          {isPending ? (
            <span className="flex items-center justify-center">
              <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></span>
              Submitting...
            </span>
          ) : (
            "Express Interest"
          )}
        </button>
        {state?.error && <p className="text-red-500">{state.error}</p>}
        {state?.success && (
          <p className="text-green-600">Sent successfully! 🎉</p>
        )}
      </form>
    </div>
  );
}
