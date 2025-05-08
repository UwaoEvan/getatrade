"use client";
import { formatDistanceToNow } from "date-fns";
import { useRouter } from "next/navigation";

type Job = {
  job: {
    id: string;
    title: string;
    description: string;
    createdAt: Date;
    category: string;
    location: string;
  };
};

export default function Job({ job }: Job) {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/my-jobs/${job.id}`)}
      className="rounded-lg bg-white p-4 shadow-sm hover:shadow-md border-l-4 border-l-[#2f76d9] transition-all duration-300 ease-in-out hover:scale-105 hover:cursor-pointer"
    >
      <h2 className="text-[#2f76d9] font-semibold mb-1">{job.title}</h2>
      <div className="text-gray-500 text-sm flex flex-wrap gap-2">
        <span>{job.category}</span>•<span>{job.location}</span>•
        <span>
          {formatDistanceToNow(new Date(job.createdAt), {
            addSuffix: true,
          })}
        </span>
      </div>
    </div>
  );
}
