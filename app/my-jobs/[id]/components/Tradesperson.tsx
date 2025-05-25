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
};

export default function Tradesperson({ jobId, interest, chat }: Props) {
  return (
    <Link
      href={chat ? `/my-jobs/${jobId}/messaging` : `/my-jobs/${jobId}/overview`}
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
