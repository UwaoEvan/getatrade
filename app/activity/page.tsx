import { Suspense } from "react";
import { auth } from "../lib/auth";
import Interest from "./Interest";
import { getInterestedLeads } from "./actions";

export default async function Interested() {
  const session = await auth();
  const showInterests = await getInterestedLeads(session?.user?.email || "");
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
              showInterests?.map((job) => <Interest key={job.id} job={job} />)
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center text-gray-600">
                <div className="text-5xl mb-4">📭</div>
                <h2 className="text-xl font-semibold mb-2">
                  No interested jobs yet
                </h2>
                <p className="text-sm max-w-md">
                  When you express interest for a job, it’ll show up here. Keep
                  exploring and applying!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Suspense>
  );
}
