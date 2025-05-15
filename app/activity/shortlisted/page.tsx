import { auth } from "@/app/lib/auth";
import { Suspense } from "react";
import Shortlist from "./Shortlist";
import { getShortlistedLeads } from "./actions";

export default async function Shortlisted() {
  const session = await auth();
  const showInterests = await getShortlistedLeads(session?.user?.email || "");
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#2f76d9]"></div>
        </div>
      }
    >
      <div className="min-h-screen mx-auto bg-gray-100 py-6 md:p-6">
        <div className="">
          <div className="space-y-4">
            {showInterests.length > 0 ? (
              showInterests?.map((job) => <Shortlist key={job.id} job={job} />)
            ) : (
              <p>You haven&apos;t shown been shortlisted to any job yet.</p>
            )}
          </div>
        </div>
      </div>
    </Suspense>
  );
}
