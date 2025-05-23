import { getJobPosting } from "@/app/lib/actions";
import { formatDistanceToNow } from "date-fns";
import { Suspense } from "react";
import { getInterestOnJob, getShortlists } from "../actions";
import CloseJob from "./components/CloseJob";
import LeadTabs from "./components/LeadTabs";

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
        <div className="md:flex md:justify-between">
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
          <CloseJob active={job?.active as boolean} jobId={job?.id} />
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
        {/* <div>
          <p className="font-bold text-xl py-4">Interested</p>
          <div className="flex flex-wrap justify-between gap-4">
            {interests.map((interest) => (
              <InterestedPerson key={interest.id} interest={interest} />
            ))}
          </div>
        </div>
        <div>
          <p className="font-bold text-xl py-4">Shortlisted</p>
          <div className="flex flex-wrap justify-between gap-4">
            {shortlists.map((shortlist) => (
              <Shortlisted
                key={shortlist.shortlistId}
                userId={shortlist.userId}
                location={shortlist.location}
                name={shortlist.username}
                jobId={jobId}
              />
            ))}
          </div>
        </div> */}
        <LeadTabs 
          jobId={jobId} 
          interests={interests} 
          shortlists={shortlists} 
        />
      </div>
    </Suspense>
  );
}
