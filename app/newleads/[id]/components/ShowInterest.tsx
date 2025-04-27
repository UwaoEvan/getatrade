"use client";

import { useActionState } from "react";
import { showInterest } from "@/app/lib/actions";

const initialState = { error: undefined, success: false };

type Props = {
  jobId: string;
  email: string;
};

export default function ShowInterestForm({ jobId, email }: Props) {
  const [state, formAction] = useActionState(showInterest, initialState);

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mt-4">
        Show Interest
      </h2>

      <form className="space-y-4" action={formAction}>
        <textarea
          name="proposal"
          placeholder="Write a message describing your interest..."
          className="w-full border border-[#2f76d9] rounded px-3 py-2 h-28"
          required
        />
        <input type="hidden" name="jobId" value={jobId} />
        <input type="hidden" name="email" value={email} />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Send Interest
        </button>

        {/* Show success/error messages */}
        {state?.error && <p className="text-red-500">{state.error}</p>}
        {state?.success && (
          <p className="text-green-600">Proposal sent successfully! 🎉</p>
        )}
      </form>
    </div>
  );
}
