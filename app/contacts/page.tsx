import { getShortlistedLeads } from "../activity/shortlisted/actions";
import { auth } from "../lib/auth";
import Notification, { EmptyState } from "./components/Notification";

export default async function Page() {
  const session = await auth();
  const shortlisted = await getShortlistedLeads(session?.user?.email || "");

  return (
    <div className="min-h-[60vh] mx-auto bg-gray-100 py-6">
      <div className="w-full px-4 md:w-[880px] mx-auto">
        <p className="text-sm md:text-2xl font-bold mb-2">Contacts</p>
        {shortlisted.map((job) => (
          <Notification key={job.id} shortlist={job} />
        ))}
        {shortlisted.length === 0 && <EmptyState />}
      </div>
    </div>
  );
}
