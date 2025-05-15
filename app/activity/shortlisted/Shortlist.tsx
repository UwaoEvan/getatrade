import { formatDistanceToNow } from "date-fns";
import { getJobPosting } from "@/app/lib/actions";
import Link from "next/link";

type Job = {
  job: {
    jobId: string;
    createdAt: Date;
  };
};

export default async function Shortlist({ job }: Job) {
  const jobDetails = await getJobPosting(job.jobId);
  return (
    <Link
      href={`/shortlisted/${job.jobId}`}
      className="block rounded-lg bg-white p-4 shadow-sm hover:shadow-md border-b-4 border-b-[#2f76d9] transition-all duration-300 ease-in-out hover:scale-105 hover:cursor-pointer"
    >
      <h2 className="text-[#2f76d9] font-semibold mb-1">{jobDetails?.title}</h2>
      <div className="text-gray-500 text-sm flex flex-wrap gap-2">
        <span>{jobDetails?.category}</span>•<span>{jobDetails?.location}</span>•
        <span>
          {formatDistanceToNow(new Date(job.createdAt), {
            addSuffix: true,
          })}
        </span>
      </div>
    </Link>
  );
}
