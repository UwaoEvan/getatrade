import { Suspense } from "react";

export default async function Shortlisted() {
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
            <p>You haven&apos;t been hired to any job yet.</p>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
