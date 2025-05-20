"use client";

import { useActionState } from "react";
import { closeJob } from "../../actions";

type Props = {
  jobId?: string;
  shortlisted?: string;
  active?: boolean;
};

const initState = { error: undefined, success: false };
export default function CloseJob({ jobId, active }: Props) {
  const [state, formAction] = useActionState(closeJob, initState);
  return (
    <div className="w-full md:w-[300px] border-1 border-gray-200 p-4 rounded-lg">
      <h2 className="font-semibold mb-2">Job status</h2>
      {active ? (
        <>
          <p className="text-sm text-green-700 bg-green-100 p-2 rounded mb-3">
            This job has been active.
          </p>
          <p className="text-sm text-gray-700 mb-4">
            Do you wish to close this job
          </p>
          <form action={formAction}>
            <input name="jobId" type="hidden" value={jobId} />
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
        </>
      ) : (
        <>
          <p className="text-sm text-red-700 bg-red-100 p-2 rounded mb-3">
            This job has been closed.
          </p>
          {/* <p className="text-sm text-gray-700 mb-4">
        Do you wish to close this job
      </p>
      <form action={formAction}>
        <input name="jobId" type="hidden" value={jobId} />
        <button
          type="submit"
          className="bg-red-500 text-white py-2 px-4 rounded w-full block text-center hover:cursor-pointer"
        >
          Close
        </button>
        {state?.success && (
          <p className="text-green-600">Closed successfully! 🎉</p>
        )}
      </form> */}
        </>
      )}
    </div>
  );
}
