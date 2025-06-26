"use client";

import { FolderClosed } from "lucide-react";

export default function Page() {
  return (
    <div className="max-w-md mx-auto md:p-6 space-y-4">
      <p className="text-xl md:text-2xl font-bold text-gray-800">Saved leads</p>

      <div className="flex flex-col items-center space-y-6">
        <div className="rounded-full bg-gray-100 p-6">
          <FolderClosed size={64} strokeWidth={2} className="text-blue-500" />
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            You don&apos;t have any saved leads
          </h2>
          <p className="text-gray-600 mt-2">Save a lead to access it later</p>
        </div>
      </div>
    </div>
  );
}
