import Link from "next/link";

type Shortlist = {
  userId: number;
  location?: string;
  name: string;
};

export default async function Shortlisted({
  userId,
  location,
  name,
}: Shortlist) {
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
          <p
            title={name}
            className="font-semibold text-gray-900"
          >{`${name?.slice(0, 30)}...`}</p>
          <p className="text-sm text-gray-500">
            ⭐ 0/0 <span className="ml-1 text-gray-400">(0 reviews)</span>
          </p>
          <p className="text-sm text-gray-600 mb-4">📍 {location}</p>
        </div>
      </div>
      <Link
        href={`/my-account/${userId}`}
        className="w-full text-center  block py-2 px-4 bg-[#2f76d9] text-white font-medium rounded-lg hover:bg-[#2f76d9] hover:cursor-pointer transition"
      >
        View profile
      </Link>

      <div className="mt-2">
        <button
          // onClick={() => setShowReviewForm(true)} // Toggle a local state
          className="text-blue-600 underline text-sm"
        >
          Add a Review
        </button>

        {/* {showReviewForm && ( */}
        <form>
          <textarea
            className="w-full p-2 border rounded my-2"
            rows={3}
            placeholder="Write your review..."
            // value={reviewText}
            // onChange={(e) => setReviewText(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-1 rounded"
          >
            Submit Review
          </button>
        </form>
        {/* )} */}
      </div>
    </div>
  );
}
