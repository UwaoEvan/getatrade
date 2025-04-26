import { signOut } from "@/auth";
import { getJobPostings } from "../lib/actions";
import { Suspense } from "react";
import Lead from "./components/Lead";

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
            <h1 className="text-2xl font-bold">New Leads</h1>
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
            {jobs.map((job) => (
              <Lead key={job.id} job={job} />
            ))}
          </div>
        </div>
      </div>
    </Suspense>
  );
}
