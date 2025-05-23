import ShortlistForm from "./ShortlistForm";

type Interested = {
  interest: {
    id: string;
  jobId: string;
  userId: number;
  user?: {
    username: string;
    location?: string | null;
  }
  }
}

export default function InterestedPerson({ interest }: Interested) {

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
          <p className="font-semibold text-gray-900">{`${interest?.user?.username?.slice(0, 10)}...`}</p>
          <p className="text-sm text-gray-500">
            ⭐ 5/5 <span className="ml-1 text-gray-400">(2 reviews)</span>
          </p>
          <p className="text-sm text-gray-600 mb-4">📍 {interest?.user?.location}</p>
        </div>
      </div>
      <ShortlistForm jobId={interest.jobId} userId={interest.userId} />
    </div>
  );
}
