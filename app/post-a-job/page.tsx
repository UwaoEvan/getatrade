import React from "react";

export default function PostAJob() {
  return (
    <div className="w-full px-4 lg:w-[800px] mx-auto py-4">
      <h1 className="text-3xl font-bold mb-4">Post a job</h1>
      <p className="mb-6 text-gray-600">
        Get responses from Getatradelinkltd's screened and reviewed tradespeople near you
      </p>

      <div className="mb-6">
        <label className="block font-semibold mb-1">What would you like to have done?</label>
        <input
          type="text"
          placeholder="Architectural Services"
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      <div className="mb-6">
        <label className="block font-semibold mb-1">What type of service do you need?</label>
        <input
          type="text"
          placeholder="e.g., Basic outline plans, Full regulation plans..."
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      <div className="mb-6">
        <label className="block font-semibold mb-1">What type of project are you planning?</label>
        <input
          type="text"
          placeholder="e.g., Extension, Renovation, New build..."
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      <div className="mb-6">
        <label className="block font-semibold mb-1">Describe what you need the plans for</label>
        <textarea
          placeholder="E.g. I need plans for something a little bit different..."
          className="w-full border border-[#2f76d9] rounded px-3 py-2 h-28"
        ></textarea>
      </div>

      <div className="flex justify-between">
        <button className="bg-[#2f76d9] text-white px-4 py-2 rounded">Post</button>
      </div>
    </div>
  );
}
