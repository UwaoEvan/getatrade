export default function InterestedPerson() {
  return (
    <div className="w-full max-w-sm p-4 bg-white rounded-xl shadow-md border border-gray-200">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5.121 17.804A3 3 0 017.58 16h8.838a3 3 0 012.46 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>
        <div>
          <p className="font-semibold text-gray-900">All Occident LTD</p>
          <p className="text-sm text-gray-500">
            ⭐ 5/5 <span className="ml-1 text-gray-400">(2 reviews)</span>
          </p>
        </div>
      </div>

      <p className="text-sm text-gray-600 mb-4">Active within</p>

      <button className="w-full py-2 px-4 bg-[#2f76d9] text-white font-medium rounded-lg hover:bg-[#2f76d9] hover:cursor-pointer transition">
        Shortlist
      </button>
    </div>
  );
}
