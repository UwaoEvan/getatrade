import Link from "next/link";
import ShortlistForm from "./ShortlistForm";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type Interested = {
  interest: {
    id: string;
    jobId: string;
    userId: number;
    shortlisted?: boolean;
    user?: {
      username: string;
      location?: string | null;
    };
  };
  jobPoster?: number;
};

export default function InterestedPerson({ interest, jobPoster }: Interested) {
  return (
    <div className="w-full max-w-sm p-4 bg-white rounded-xl shadow-md border border-gray-200">
      <Link
        href={`/my-jobs/${interest.jobId}/overview?tradesperson=${interest.userId}&jobPoster=${jobPoster}`}
        className="flex items-center gap-3 mb-2"
      >
        <Avatar className="w-10 h-10">
          <AvatarFallback className="bg-blue-100 text-[#2f76d9]">
            {interest.user?.username.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <p
            title={interest.user?.username}
            className="font-semibold text-gray-900"
          >{`${interest.user?.username?.slice(0, 30)}...`}</p>
          <p className="text-sm text-gray-500">
            ⭐ 0/0 <span className="ml-1 text-gray-400">(0 reviews)</span>
          </p>
          <p className="text-sm text-gray-600 mb-4">
            📍 {interest.user?.location}
          </p>
        </div>
      </Link>
      <ShortlistForm
        shortlistId={interest.id}
        userId={interest.userId}
        disabled={interest.shortlisted}
      />
    </div>
  );
}
