"use client";
import React from "react";
import { useActionState } from "react";
import { postJob } from "../lib/actions";
import { Suspense } from "react";

const initialState = { error: undefined, success: false };
export default function PostAJob() {
  const [state, formAction, isPending] = useActionState(postJob, initialState);
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#2f76d9]"></div>
        </div>
      }
    >
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
            <input
              type="text"
              name="title"
              placeholder="Architectural Services"
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <div className="mb-6">
            <label className="block font-semibold mb-1">
              What type of service do you need?
            </label>
            <input
              type="text"
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
              name="location"
              placeholder="e.g., Maidstone"
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div className="mb-6">
            <label className="block font-semibold mb-1">
              What is your contact email?
            </label>
            <input
              type="email"
              name="contactEmail"
              placeholder="e.g., user@info.com"
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <div className="flex justify-between">
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
          </div>
          {state?.error && <p className="text-red-500">{state.error}</p>}
          {state?.success && (
            <p className="text-green-600">
              Job posting created successfully! 🎉
            </p>
          )}
        </form>
      </div>
    </Suspense>
  );
}
