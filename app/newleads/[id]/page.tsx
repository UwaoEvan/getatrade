import { getJobPosting, showInterest } from "@/app/lib/actions";
import { formatDistanceToNow } from "date-fns";
import { auth } from "@/auth";
import { Suspense } from "react";

type Params = {
  params: {
    id: string;
  };
  searchParams: { success?: string; error?: string };
};

export default async function LeadDetails({ params, searchParams }: Params) {
  const { id: jobId } = await params;
  const { success, error } = await searchParams;
  const job = await getJobPosting(jobId as string);
  const session = await auth();

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#2f76d9]"></div>
        </div>
      }
    >
      <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md space-y-8">
        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-gray-800">{job?.title}</h1>
          <p className="text-sm text-gray-500">
            {job?.location} •{" "}
            {formatDistanceToNow(new Date(job?.createdAt || ""), {
              addSuffix: true,
            })}
          </p>
          <div className="mt-4 space-y-1">
            <p>
              <span className="font-semibold">Project:</span> {job?.project}
            </p>
            <p>
              <span className="font-semibold">Category:</span> {job?.category}
            </p>
            <p className="font-semibold mt-2">Job description</p>
            <p className="text-gray-700">{job?.description}</p>
          </div>
        </div>
        <hr className="border-gray-300" />
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mt-4">
            Show Interest
          </h2>
          <form className="space-y-4" action={showInterest}>
            <textarea
              name="proposal"
              placeholder="Write a message describing your interest..."
              className="w-full border border-[#2f76d9] rounded px-3 py-2 h-28"
              required
            />
            <input type="hidden" name="jobId" value={jobId} />
            <input
              type="hidden"
              name="email"
              value={session?.user?.email || ""}
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Send Interest
            </button>
            {/* Show success or error messages based on searchParams */}
            {success === "true" && (
              <p className="text-green-600 mt-2">
                ✅ Thank you! Your interest has been submitted.
              </p>
            )}
            {error && (
              <p className="text-red-600 mt-2">
                ❌ {decodeURIComponent(error)}
              </p>
            )}
          </form>
        </div>
      </div>
    </Suspense>
  );
}
