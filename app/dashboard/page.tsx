import { signOut } from "@/auth";
import { getJobPostings } from "../lib/actions";
import { formatDistanceToNow } from "date-fns";
import { Suspense } from "react";

export default async function Dashboard() {
  const jobs = await getJobPostings();

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#2f76d9]"></div>
        </div>
      }
    >
      <div className="min-h-screen mx-auto bg-gray-100 p-6">
        <div className="w-full px-4 md:w-[880px] mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/" });
              }}
            >
              <button className="flex h-[48px] items-center justify-center gap-2 rounded-md bg-gray-50 px-4 text-sm font-medium hover:bg-sky-100 hover:text-blue-600">
                <div>Sign Out</div>
              </button>
            </form>
          </div>

          <div className="space-y-4">
            {jobs.map((job, idx) => (
              <div
                key={idx}
                className="rounded-lg bg-white p-4 shadow-sm hover:shadow-md"
              >
                <h2 className="text-purple-700 font-semibold mb-1">
                  {job.title}
                </h2>
                <div className="text-gray-500 text-sm flex flex-wrap gap-2">
                  <span>{job.category}</span>•<span>{job.location}</span>•
                  <span>
                    {formatDistanceToNow(new Date(job.createdAt), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Suspense>
  );
}
