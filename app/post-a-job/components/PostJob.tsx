"use client";
import Location from "@/app/components/Location";
import { SERVICES } from "@/app/lib/services";
import { useState } from "react";

export default function PostJob() {
  const [location, setLocation] = useState("");
  return (
    <div>
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
          Add a description to your job
        </label>
        <textarea
          name="description"
          required
          placeholder="Include any details you think the tradesperson should know(paint color, timeframe, etc)"
          className="w-full border border-[#2f76d9] rounded px-3 py-2 h-28"
        ></textarea>
      </div>
      <div className="mb-6">
        <label className="block font-semibold mb-1">
          What is your location?
        </label>
        <Location
          value={location}
          onChange={setLocation}
          placeholder="Start typing your location..."
          className="mt-1 block w-full rounded-sm border-gray-300 shadow-sm focus:ring-[#2f76d9] focus:border-[#2f76d9] sm:text-sm p-3"
        />

        <input type="hidden" name="location" value={location} />
      </div>
    </div>
  );
}
