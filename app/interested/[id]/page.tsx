import { getJobPosting, getShortListedInfo } from "@/app/lib/actions";
import { formatDistanceToNow } from "date-fns";
import { Suspense } from "react";
import Shortlist from "./components/Shortlist";
import { signOut } from "@/app/lib/auth";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export default async function InterestedDetails({ params }: Params) {
  const { id: jobId } = await params;
  const job = await getJobPosting(jobId as string);
  const shortlisted = await getShortListedInfo(jobId);

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#2f76d9]"></div>
        </div>
      }
    >
      <div className="max-w-4xl mx-auto mt-10 p-6 space-y-8">
        <div className="space-y-3">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold"></h1>
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/" });
              }}
            >
              <button className="flex h-[48px] items-center justify-center gap-2 rounded-md bg-gray-50 px-4 text-sm font-medium hover:bg-sky-100 hover:text-blue-600">
                <div>Sign Out</div>
              </button>
            </form>
          </div>
          <h1 className="text-3xl font-bold text-gray-800">{job?.title}</h1>
          <p className="text-sm text-gray-500">
            {job?.location} •{" "}
            {formatDistanceToNow(new Date(job?.createdAt || ""), {
              addSuffix: true,
            })}
          </p>
        </div>
        <div className="flex justify-between flex-wrap md:flex-nowrap">
          <div className="w-3xl">
            <div className="mb-4 space-y-1">
              <p className="font-bold mb-4">Job description</p>
              <p>
                <span className="font-semibold">Job type:</span> {job?.project}
              </p>
              <p>
                <span className="font-semibold">Category:</span> {job?.category}
              </p>
              <p className="font-semibold mt-2">
                Note: <span className="font-normal">{job?.description}</span>
              </p>
            </div>
            <hr className="border-gray-300" />
            <p className="font-bold text-xl py-4">Activity on this lead</p>

            {shortlisted?.id ? (
              <div>
                <p className="text-green-600">
                  Congratulations 🎉! You have been shortlisted.
                </p>
                <Shortlist jobId={jobId} />
              </div>
            ) : (
              <p>Waiting for the client&apos;s feedback.</p>
            )}
          </div>
        </div>
      </div>
    </Suspense>
  );
}
