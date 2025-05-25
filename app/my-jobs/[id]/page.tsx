import { getJobPosting } from "@/app/lib/actions";
import { formatDistanceToNow } from "date-fns";
import { Suspense } from "react";
import { getInterestOnJob, getShortlists } from "../actions";
import LeadTabs from "./components/LeadTabs";
import { Clock, MapPin, MessageCircle } from "lucide-react";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export default async function LeadDetails({ params }: Params) {
  const { id: jobId } = await params;
  const job = await getJobPosting(jobId as string);
  const interests = await getInterestOnJob(job?.id as string);
  const shortlists = await getShortlists(jobId);

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
            <span>2 responses</span>
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
          <hr className="border-gray-300" />
          <p className="font-bold text-xl py-4">Activity on this job</p>
          <div className="border-1 border-gray-200">
            <div className="flex justify-center items-center py-4">
              <div className="p-2">
                <p className="text-sm font-bold text-center">
                  <span className="text-xl">{job?.interested}</span> Interested
                </p>
                <p className="text-sm">Tradespeople who expressed interest.</p>
              </div>
              <div className="p-2">
                <p className="text-sm font-bold text-center">
                  <span className="text-xl">{job?.shortlisted}</span>{" "}
                  Shortlisted
                </p>
                <p className="text-sm">
                  Tradespeople who received contact details.
                </p>
              </div>
            </div>
          </div>
        </div>
        <LeadTabs jobId={jobId} interests={interests} shortlists={shortlists} />
      </div>
    </Suspense>
  );
}
