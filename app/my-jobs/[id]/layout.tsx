import { getJobPosting } from "@/app/lib/actions";
import Sidebar from "./components/Sidebar";
import Link from "next/link";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export default async function MyJobLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Params;
}) {
  // @ts-expect-error is async
  const { id } = await params;
  const job = await getJobPosting(id as string);
  return (
    <div className="bg-gray-50">
      <div className="max-w-4xl px-4 mx-auto">
        <div className="py-6">
          <h1 className="text-lg md:text-2xl font-bold">
            Responses to your job: {job?.title}
          </h1>
          <div className="flex items-center mt-2">
            <Link
              href={`/my-jobs/${job?.id}`}
              className="text-sm md:text-md font-semibold text-gray-500"
            >
              View details
            </Link>
            <p className="px-4 text-gray-300 font-bold">|</p>
            <Link
              href={`/my-jobs/${job?.id}/edit`}
              className="text-sm md:text-md font-semibold text-gray-500"
            >
              Edit
            </Link>
            <p className="px-4 text-gray-300 font-bold">|</p>
            <Link
              href={`/my-jobs/${job?.id}/close`}
              className="text-sm md:text-md font-semibold text-gray-500"
            >
              Close job
            </Link>
          </div>
        </div>
        <div className="flex flex-col md:flex-row min-h-[60vh] pb-6">
          <Sidebar id={id} currentUser={job?.userId} jobTitle={job?.title} />
          <main className="flex-1">
            <div className="">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
