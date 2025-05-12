"use client";
import { SERVICES } from "@/app/lib/services";
import { useActionState, useEffect } from "react";
import { postNewJob } from "../lib/actions";
import { useRouter } from "next/navigation";

const initialState = { error: undefined, success: false };
export default function PostJob() {
  const [state, formAction, isPending] = useActionState(
    postNewJob,
    initialState,
  );
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      router.push("/my-jobs");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <div className="w-full px-4 lg:w-[800px] mx-auto py-4">
      <h1 className="text-3xl font-bold mb-4">Post a job</h1>
      <p className="mb-6 text-gray-600">
        Get responses from Getatradelinkltd&apos;s screened and reviewed
        tradespeople near you
      </p>
      <form action={formAction}>
        <div className="mb-6">
          <label className="block font-semibold mb-1">
            What would you like to have done?
          </label>
          <select
            name="title"
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="">Select a service</option>
            {SERVICES.map((service) => (
              <option key={service.id} value={service.label}>
                {service.label}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label className="block font-semibold mb-1">
            What type of service do you need?
          </label>
          <input
            type="text"
            required
            name="category"
            placeholder="e.g., Basic outline plans, Full regulation plans..."
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div className="mb-6">
          <label className="block font-semibold mb-1">
            What type of project are you planning?
          </label>
          <input
            type="text"
            name="project"
            required
            placeholder="e.g., Extension, Renovation, New build..."
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div className="mb-6">
          <label className="block font-semibold mb-1">
            Describe what you need the plans for
          </label>
          <textarea
            name="description"
            required
            placeholder="E.g. I need plans for something a little bit different..."
            className="w-full border border-[#2f76d9] rounded px-3 py-2 h-28"
          ></textarea>
        </div>
        <div className="mb-6">
          <label className="block font-semibold mb-1">
            What is your location?
          </label>
          <input
            type="text"
            required
            name="location"
            placeholder="e.g., Maidstone"
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <button className="bg-[#2f76d9] text-white px-4 py-2 rounded">
          {isPending ? (
            <span className="flex items-center justify-center">
              <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></span>
              Posting...
            </span>
          ) : (
            "Post job"
          )}
        </button>
      </form>
    </div>
  );
}
