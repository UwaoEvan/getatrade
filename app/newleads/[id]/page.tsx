import { getJobPosting } from "@/app/lib/actions";
import { formatDistanceToNow } from "date-fns";
import { auth } from "@/app/lib/auth";
import { Suspense } from "react";
import ShowInterestForm from "./components/ShowInterest";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export default async function LeadDetails({ params }: Params) {
  const { id: jobId } = await params;
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
        <ShowInterestForm jobId={jobId} email={session?.user?.email || ""} />
      </div>
    </Suspense>
  );
}
