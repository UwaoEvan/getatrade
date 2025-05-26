"use client";
import { useActionState } from "react";
import { shortlistTradesperson } from "../../actions";

type Shortlist = {
  jobId: string;
  userId?: number;
};

const initialState = { error: undefined, success: false };
export default function ShortlistForm({ userId, jobId }: Shortlist) {
  const [state, formAction] = useActionState(
    shortlistTradesperson,
    initialState,
  );

  return (
    <form action={formAction}>
      <input name="jobId" value={jobId} type="hidden" />
      <input name="userId" value={userId} type="hidden" />
      <button className="w-full py-2 px-4 bg-[#2f76d9] text-white font-medium rounded-lg hover:bg-[#2f76d9] hover:cursor-pointer transition">
        Shortlist
      </button>
      {state?.error && <p className="text-red-500">{state.error}</p>}
      {state?.success && (
        <p className="text-green-600">Sent successfully! 🎉</p>
      )}
    </form>
  );
}
