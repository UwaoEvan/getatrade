import { getJobPosting } from "@/app/lib/actions";
import { formatDistanceToNow } from "date-fns";
import { Suspense } from "react";
import ShortlistFee from "./components/ShortlistFee";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export default async function LeadDetails({ params }: Params) {
  const { id: jobId } = await params;
  const job = await getJobPosting(jobId as string);
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
            <hr className="border-gray-300" />
            <p className="font-bold text-xl py-4">Activity on this lead</p>
            <div className="border-1 border-gray-200">
              <div className="flex justify-around items-center py-4">
                <div>
                  <p className="text-sm font-bold text-center">
                    <span className="text-xl">4</span> Interested
                  </p>
                  <p className="text-sm">
                    Tradespeople who expressed interest.
                  </p>
                </div>
                <div>
                  <p className="text-sm font-bold text-center">
                    <span className="text-xl">0</span> Shortlisted
                  </p>
                  <p className="text-sm">
                    Tradespeople who received contact details.
                  </p>
                </div>
              </div>
              <div className="py-2 px-4 text-sm bg-gray-200">
                Your chances are good! This customer hasn&apos;t shortlisted anyone
                yet.
              </div>
            </div>
            <div className="mt-4 space-y-1">
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
          </div>
          <ShortlistFee />
          {/* <ShowInterestForm jobId={jobId} email={session?.user?.email || ""} /> */}
        </div>
      </div>
    </Suspense>
  );
}
