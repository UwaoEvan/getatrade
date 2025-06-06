import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

type Props = {
  jobId?: string;
  chat: boolean;
  interest: {
    id: string;
    jobId: string;
    userId: number;
    user?: {
      username: string;
      location?: string | null;
    };
  };
  currentUser?: number;
};

export default function Tradesperson({
  jobId,
  interest,
  chat,
  currentUser,
}: Props) {
  return (
    <Link
      href={
        chat
          ? `/my-jobs/${jobId}/messaging?target=${interest.userId}&from=${currentUser}`
          : `/my-jobs/${jobId}/overview?id=${interest?.userId}`
      }
      className="flex items-center justify-between px-3 py-4 border-t-1 border-t-gray-100 hover:cursor-pointer hover:bg-gray-100"
    >
      <div className="flex items-center space-x-3">
        <Avatar className="w-10 h-10">
          <AvatarFallback className="bg-blue-100 text-[#2f76d9]">
            {interest.user?.username.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <div
            className="text-[#2f76d9] font-medium"
            title={interest.user?.username}
          >
            {interest.user?.username}
          </div>
          <div className="text-xs text-gray-600">⭐ 0/0 reviews</div>
        </div>
      </div>
      <ChevronRight className="text-gray-400 w-4 h-4" />
    </Link>
  );
}

type Shortlist = {
  userId: number;
  location?: string;
  name: string;
  jobId?: string;
  currentUser?: number;
};

export function Shortlisted({ userId, name, jobId, currentUser }: Shortlist) {
  return (
    <Link
      href={`/my-jobs/${jobId}/messaging?target=${userId}&from=${currentUser}`}
      className="flex items-center justify-between px-3 py-4 border-t-1 border-t-gray-100 hover:cursor-pointer hover:bg-gray-100"
    >
      <div className="flex items-center space-x-3">
        <Avatar className="w-10 h-10">
          <AvatarFallback className="bg-blue-100 text-[#2f76d9]">
            {name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="text-[#2f76d9] font-medium" title={name}>
            {name}
          </div>
          <div className="text-xs text-gray-600">⭐ 0/0 reviews</div>
        </div>
      </div>
      <ChevronRight className="text-gray-400 w-4 h-4" />
    </Link>
  );
}
