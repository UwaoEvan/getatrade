import { auth } from "../lib/auth";
import { getUser } from "../lib/actions";
import { Suspense } from "react";
import Job from "./components/Job";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getCustomerJobs } from "./actions";

export default async function Dashboard() {
  const session = await auth();
  const jobs = await getCustomerJobs(session?.user?.email as string);

  const user = await getUser(session?.user?.email as string);

  if (user?.role !== "customer") {
    redirect("/new-leads");
  } else if (!user.firstName) {
    redirect("/update-profile?role=customer");
  }
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#2f76d9]"></div>
        </div>
      }
    >
      <div className="min-h-[60vh] mx-auto bg-gray-100 py-6">
        <div className="w-full px-4 md:w-[880px] mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">My Jobs</h1>
            <div className="flex items-center">
              <Link
                href="/new-job"
                className="border text-sm border-[#2f76d9] px-4 py-1 rounded hover:bg-white hover:text-[#1f0e2b] transition text-[#2f76d9]"
              >
                Post a new job
              </Link>
            </div>
          </div>
          <div className="space-y-4">
            {jobs.length > 0 ? (
              jobs.map((job) => <Job key={job.id} job={job} />)
            ) : (
              <p>No new jobs</p>
            )}
          </div>
        </div>
      </div>
    </Suspense>
  );
}
