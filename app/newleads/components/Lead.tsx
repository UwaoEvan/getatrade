"use client";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/navigation";
import location from "@/public/location.png";
import duration from "@/public/deadline.png";
import task from "@/public/build.png";

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

export default function Lead({ job }: Job) {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/newleads/${job.id}`)}
      className="rounded-lg bg-white p-4 shadow-sm hover:shadow-md border-l-4 border-l-[#2f76d9] transition-all duration-300 ease-in-out hover:scale-105 hover:cursor-pointer"
    >
      <h2 className="text-[#2f76d9] font-semibold mb-1">{job.title}</h2>
      <div className="text-gray-500 text-sm flex flex-wrap gap-2">
        <Image src={task} alt="task" className="h-5 w-4 object-contain" />
        <span>{job.category}</span>
        <Image
          src={location}
          alt="location"
          className="h-5 w-4 object-contain"
        />
        <span>{job.location}</span>
        <Image
          src={duration}
          alt="duration"
          className="h-4 w-4 object-contain"
        />
        <span>
          {formatDistanceToNow(new Date(job.createdAt), {
            addSuffix: true,
          })}
        </span>
      </div>
    </div>
  );
}
