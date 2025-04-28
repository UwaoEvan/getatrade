import { getInterestedLeads } from "../lib/actions";
import { Suspense } from "react";
import { auth, signOut } from "../lib/auth";
import Interest from "./components/Interest";

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
      <div className="min-h-screen mx-auto bg-gray-100 p-6">
        <div className="w-full px-4 md:w-[880px] mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Interested Leads</h1>
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
            {showInterests.length > 0 ? (
              showInterests?.map((job) => <Interest key={job.id} job={job} />)
            ) : (
              <p>You haven't shown interest to any job yet.</p>
            )}
          </div>
        </div>
      </div>
    </Suspense>
  );
}
