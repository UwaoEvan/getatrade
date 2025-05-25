import { formatDistanceToNow } from "date-fns";
import { getJobPosting, getUser } from "../lib/actions";
import Chat from "./Chat";

type SearchParams = {
  searchParams: Promise<{
    jobId?: string
    userId?: string
  }>
};

export default async function Messages({ searchParams }: SearchParams) {
  const { jobId, userId } = await searchParams;
  const job = await getJobPosting(jobId as string);
  const user = await getUser("", parseInt(userId as string));
  return (
    <div className="flex flex-col lg:flex-row min-h-[60vh] mx-auto bg-gray-100 p-6 font-sans text-sm">
      <div className="md:w-[880px] mx-auto flex">
        <div className=" bg-white rounded-xl border border-gray-200">
          <div className="border-b p-4 font-semibold text-base">
            {user?.username}
          </div>

          <Chat user={user || undefined} />
        </div>

        <div className="w-full lg:w-80 mt-6 lg:mt-0 lg:ml-6 space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-3">
            <h3 className="font-semibold">Contact details</h3>
            <div className="bg-green-50 text-green-800 p-2 rounded-md text-sm">
              ✅ You&apos;ve been hired for this job
            </div>
            <div className="text-sm">
              📞{" "}
              <a href={user?.phoneNumber || ""} className="underline">
                {user?.phoneNumber}
              </a>
            </div>
            <div className="text-sm">
              📧{" "}
              <a href={user?.email} className="underline">
                {user?.email}
              </a>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-3">
            <h3 className="font-semibold">{job?.title}</h3>
            <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-2 py-1 rounded-full">
              Customer
            </span>
            <div className="text-sm space-y-1 mt-2">
              {/* <p>💬 2 responses</p> */}
              <p>
                ⏱{" "}
                {formatDistanceToNow(new Date(job?.createdAt || ""), {
                  addSuffix: true,
                })}
              </p>
              <p>
                💷 You&apos;ve been charged <strong>£32</strong> + VAT
              </p>
              <p>📍 {job?.location}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
