import { getJobPosting } from "@/app/lib/actions";
import { formatDistanceToNow } from "date-fns";
import { Suspense } from "react";
import Shortlist from "./components/Shortlist";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export default async function InterestedDetails({ params }: Params) {
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
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">{job?.title}</h1>

        <div className="flex items-center text-gray-500 space-x-4 mb-6">
          <span>
            🕒{" "}
            {formatDistanceToNow(new Date(job?.createdAt || ""), {
              addSuffix: true,
            })}
          </span>
          <div className="flex items-center text-sm text-gray-700 mt-1">
            <svg
              className="w-4 h-4 mr-1 text-[#fe3333]"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 2a6 6 0 016 6c0 4.418-6 10-6 10S4 12.418 4 8a6 6 0 016-6zm0 8a2 2 0 100-4 2 2 0 000 4z" />
            </svg>
            <span>{job?.location}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="md:col-span-2 md:p-4 rounded-lg mt-6 h-fit">
            <div>
              <h2 className="text-lg font-semibold mb-4">
                Activity on this lead
              </h2>
              <div className="flex justify-between text-center border-1 border-gray-200 px-4 py-6">
                <div>
                  <div className="text-2xl font-bold text-[#2f76d9]">
                    {job?.interested}{" "}
                    <span className="text-sm text-gray-600">Interested</span>
                  </div>
                  <div className="text-xs text-gray-400">
                    Tradespeople who expressed interest
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#2f76d9]">
                    {job?.shortlisted}{" "}
                    <span className="text-sm text-gray-600">Shortlisted</span>
                  </div>
                  <div className="text-xs text-gray-400">
                    Tradespeople who received contact details
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Shortlist />
        </div>

        <div className="p-4 rounded-lg mb-6">
          <h2 className="font-semibold mb-2">Job description</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
            <div>
              <strong>Job type:</strong> Painting & Decorating
            </div>
            <div>
              <strong>Location:</strong> Interior
            </div>
            <div>
              <strong>Service:</strong> Paint / decorate 3 rooms
            </div>
            <div>
              <strong>Note:</strong> Includes hallway, stairs and landing
            </div>
          </div>
        </div>

        <div className="p-4 rounded-lg">
          <h2 className="font-semibold mb-2">Customer description:</h2>
          <p className="text-sm text-gray-800">
            paint all 3 rooms and hallway and stairs
          </p>
        </div>
      </div>
    </Suspense>
  );
}
