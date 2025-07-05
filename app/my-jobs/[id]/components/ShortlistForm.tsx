"use client";
import { useActionState } from "react";
import { shortlistTradesperson } from "../../actions";

type Shortlist = {
  shortlistId: string;
  userId?: number;
  disabled?: boolean;
};

const initialState = { error: undefined, success: false };
export default function ShortlistForm({
  userId,
  shortlistId,
  disabled,
}: Shortlist) {
  const [state, formAction] = useActionState(
    shortlistTradesperson,
    initialState,
  );

  return (
    <form action={formAction}>
      <input name="shortlistId" value={shortlistId} type="hidden" />
      <input name="userId" value={userId} type="hidden" />
      <button
        disabled={disabled}
        className={
          disabled
            ? "w-full py-2 px-4 bg-gray-300 text-white font-medium rounded-lg hover:cursor-not-allowed transition"
            : "w-full py-2 px-4 bg-[#2f76d9] text-white font-medium rounded-lg hover:bg-[#2f76d9] hover:cursor-pointer transition"
        }
      >
        {disabled ? "Shortlisted" : "Shortlist"}
      </button>
      {state?.error && <p className="text-red-500">{state.error}</p>}
      {state?.success && (
        <p className="text-green-600">Sent successfully! 🎉</p>
      )}
    </form>
  );
}
