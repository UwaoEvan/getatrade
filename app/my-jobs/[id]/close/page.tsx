"use client";

import { useParams, useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { closeJob } from "../../actions";

const initState = { error: undefined, success: false };
export default function Close() {
  const [state, formAction] = useActionState(closeJob, initState);
  const router = useRouter();
  const params = useParams();
  const jobId = params?.id;

  useEffect(() => {
    if (state.success) {
      router.push(`/my-jobs/${jobId}`);
    }
  }, [state]);

  return (
    <div>
      <p className="text-sm text-green-500 bg-green-100 p-2 rounded mb-3">
        This job is still active.
      </p>
      <p className="text-sm text-gray-700 mb-4">
        Do you wish to close this job
      </p>
      <form action={formAction}>
        <input name="jobId" type="hidden" value={jobId as string} />
        <button
          type="submit"
          className="bg-red-500 text-white py-2 px-4 rounded w-full block text-center hover:cursor-pointer"
        >
          Close
        </button>
        {state?.success && (
          <p className="text-green-600">Closed successfully! 🎉</p>
        )}
      </form>
    </div>
  );
}
