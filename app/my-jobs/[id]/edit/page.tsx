import { getJobPosting } from "@/app/lib/actions";
import { formatDistanceToNow } from "date-fns";
import { Suspense } from "react";
import { Clock, MapPin, MessageCircle } from "lucide-react";
import { updateJob } from "@/app/new-job/actions";
import Link from "next/link";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Page({ params }: Params) {
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
      <div className="px-6 space-y-8">
        <div className="flex flex-wrap items-center gap-6 bg-blue-100 text-black p-4 rounded-md">
          <div className="flex items-center gap-2 text-sm">
            <MessageCircle className="w-5 h-5" />
            <span>Responses</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-5 h-5" />
            <span>
              {formatDistanceToNow(new Date(job?.createdAt || ""), {
                addSuffix: true,
              })}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="w-5 h-5" />
            <span>{job?.location}</span>
          </div>
        </div>
        <div className="md:flex md:justify-between">
          <div className="mt-4">
            <p className="mb-4 font-bold text-lg">Job description</p>

            <div className="space-y-2">
              <div className="grid grid-cols-[150px_1fr] gap-2">
                <span className="">Job type:</span>
                <span>{job?.project}</span>
              </div>

              <div className="grid grid-cols-[150px_1fr] gap-2">
                <span className="">Category:</span>
                <span>{job?.category}</span>
              </div>

              <div className="grid grid-cols-[150px_1fr] gap-2">
                <span className="">Note:</span>
                <span>{job?.description}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full">
          <form action={updateJob}>
            <div className="mb-6">
              <input type="hidden" value={job?.id} name="jobId" />
              <label className="block font-semibold mb-1">
                Add a description to your job
              </label>
              <textarea
                name="description"
                required
                defaultValue={job?.description}
                placeholder="Include any details you think the tradesperson should know(paint color, timeframe, etc)"
                className="w-full text-sm border border-[#2f76d9] rounded px-3 py-2 h-28"
              ></textarea>
            </div>

            <div className="mb-6">
              <label className="block font-semibold mb-1">
                Add photos or blueprints (Optional)
              </label>
              <label
                htmlFor="upload"
                className="flex flex-col items-center mt-6 justify-center w-full sm:w-64 h-20 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:border-[#2f76d9] text-gray-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 mb-2 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 15a4 4 0 014-4h10a4 4 0 014 4v4H3v-4zM7 10V7a5 5 0 0110 0v3"
                  />
                </svg>
                <span className="text-sm">
                  Drag or select your files (PNG, JPG)
                </span>
                <input
                  id="upload"
                  type="file"
                  accept="image/png, image/jpeg"
                  multiple
                  className="hidden"
                />
              </label>
            </div>

            <div className="mb-4 flex items-start">
              <input type="checkbox" name="terms" className="mr-2 mt-1" />
              <label className="text-sm">
                Send updates to tradespeople who have already responded
              </label>
            </div>

            <div className="flex mb-4">
              <Link
                href={`/my-jobs/${jobId}`}
                className="block w-1/2 bg-white border text-sm py-2 px-4 rounded-sm hover:cursor-pointer transition"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="w-1/2 text-sm ml-6 bg-[#2f76d9] text-white py-2 px-4 rounded-sm hover:cursor-pointer transition"
              >
                Save changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </Suspense>
  );
}
