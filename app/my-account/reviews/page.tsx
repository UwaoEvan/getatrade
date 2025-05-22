import { getReviews } from "./action";
import { format } from "date-fns";

export default async function Reviews() {
  const reviews = await getReviews();
  return (
    <section className="max-w-2xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold">Overall rating</h2>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold">0</span>
              <span className="text-gray-200">★★★★★</span>
              {/* <span className="text-[#fd914d]">★★★★★</span> */}
              <span className="text-gray-500 text-sm">(0 reviews)</span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-bold text-lg mb-4">Reviews ({reviews?.length})</h3>
        {reviews?.map((review, idx) => (
          <div key={idx} className="mb-8">
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center mb-2">
                <span className="text-[#fd914d] mr-2">★★★★★</span>
                <span className="text-gray-500 text-xs">
                  Review left on {format(review.createdAt, "dd-MM-yyyy")}
                </span>
              </div>
              <div className="font-bold">{review.title}</div>
              <div className="mt-1 text-gray-700 text-sm">{review.review}</div>
              <div className="text-xs text-gray-400 mt-1">
                {/* (Updated on {format(review.createdAt, "dd-MM-yyyy")}) */}
              </div>
            </div>
          </div>
        ))}
        <div className="text-center py-12">
          <div className="text-4xl mb-4">📝</div>
          <h3 className="text-lg font-semibold text-gray-700">
            No reviews yet
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Once people start sharing their thoughts, you’ll see them here.
          </p>
        </div>
      </div>
    </section>
  );
}
