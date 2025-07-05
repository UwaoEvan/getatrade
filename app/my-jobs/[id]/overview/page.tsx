import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import TabSelector from "./components/TabSelector";
import { getUser } from "@/app/lib/actions";
import Link from "next/link";
import { getShortlistedOnJob } from "../../actions";

type SearchParams = {
  searchParams: Promise<{
    tradesperson?: string;
    jobPoster?: string;
  }>;
  params: Promise<{
    id: string;
  }>;
};

export default async function ProfilePage({
  searchParams,
  params,
}: SearchParams) {
  const { tradesperson, jobPoster } = await searchParams;
  const { id: jobId } = await params;
  const shortlisted = await getShortlistedOnJob(jobId as string);
  const user = await getUser("", shortlisted?.userId);

  return (
    <div className="max-w-4xl mx-auto md:px-6 space-y-6">
      <div className="flex items-center space-x-4 p-4 border rounded-md">
        <Avatar className="w-10 h-10">
          <AvatarFallback className="bg-blue-100 text-blue-600">
            {user?.username.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold">{user?.username}</p>
          <p className="text-sm text-green-600 font-medium">
            New on Getatradelink
          </p>
          <p className="text-xs text-gray-500">
            Response received - 3 days ago
          </p>
        </div>
      </div>

      {/* <div className="flex items-center gap-2 text-sm p-3 rounded-md border">
        <MapPin className="w-4 h-4 text-[#2f76d9]" />
        <span>Active within</span>
      </div> */}

      <div className="border rounded-md p-5 space-y-4">
        <h2 className="text-lg font-semibold text-gray-800">
          {user?.username} is interested in your job.
        </h2>
        <p className="text-sm text-gray-600">
          Start a chat to exchange contact details and discuss the job here, by
          phone or email.
        </p>
        <div className="flex space-x-4">
          <Link
            href={`/my-jobs/${jobId}`}
            className="block px-4 py-2 border text-sm rounded-md text-blue-600 "
          >
            Not interested
          </Link>
          <Link
            href={`/my-jobs/${jobId}/messaging?target=${jobPoster}&from=${tradesperson}`}
            className="block px-4 py-2 text-sm bg-blue-600 text-white rounded-md "
          >
            Start chat
          </Link>
        </div>
      </div>

      <TabSelector
        userId={user?.id}
        about={user?.about as string}
        role={user?.role as string}
      />
    </div>
  );
}
