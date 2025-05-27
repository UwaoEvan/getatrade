import { formatDistanceToNow } from "date-fns";
import Link from "next/link";

type Job = {
  job?: {
    id: string;
    title: string;
    createdAt: Date;
    location: string;
    category: string;
  };
};

export default async function Hired({ job }: Job) {
  console.log(job);
  return (
    <Link
      href={`/hired/${job?.id}`}
      className="block rounded-lg bg-white p-4 shadow-sm hover:shadow-md border-b-4 border-b-[#2f76d9] transition-all duration-300 ease-in-out hover:scale-105 hover:cursor-pointer"
    >
      <h2 className="text-[#2f76d9] font-semibold mb-1">{job?.title}</h2>
      <div className="text-gray-500 text-sm flex flex-wrap gap-2">
        <span>{job?.category}</span>•<span>{job?.location}</span>•
        <span>
          {formatDistanceToNow(new Date(job?.createdAt || ""), {
            addSuffix: true,
          })}
        </span>
      </div>
    </Link>
  );
}
