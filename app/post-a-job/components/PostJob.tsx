import { SERVICES } from "@/app/lib/services";

export default function PostJob() {
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
    </div>
  );
}
