import { auth } from "../lib/auth";
import { getJobPostings, getUser } from "../lib/actions";
import { Suspense } from "react";
import Lead from "./components/Lead";
import { redirect } from "next/navigation";
import Unverified from "@/components/ui/Unverified";

export default async function Dashboard() {
  const session = await auth();
  const user = await getUser(session?.user?.email as string);

  if (user?.role === "customer") {
    redirect("/my-jobs");
  } else if (user?.role === "Admin") {
    redirect("/dashboard");
  } else if (user?.role !== "customer" && !user?.about || !user?.location) {
    redirect("/update-profile");
  }

  const jobs = await getJobPostings();

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
          {user.verificationStatus !== "Verified" && (
            <Unverified status={user.verificationStatus || "Not verified"} />
          )}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">New Leads</h1>
          </div>

          <div className="space-y-4">
            {jobs.length > 0 ? (
              jobs.map((job) => <Lead key={job.id} job={job} />)
            ) : (
              <p>No new leads</p>
            )}
          </div>
        </div>
      </div>
    </Suspense>
  );
}
