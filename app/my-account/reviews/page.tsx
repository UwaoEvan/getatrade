import { getAverageRating, getReviews } from "./action";
import ReviewCard from "./ReviewCard";

export default async function Reviews() {
  const reviews = await getReviews();
  const avg = await getAverageRating();
  return (
    <section className="max-w-2xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold">Overall rating</h2>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold">
                {avg?._avg.rating?.toFixed(1) ?? "0.0"}
              </span>

              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={
                      i < Math.round(avg?._avg.rating ?? 0)
                        ? "text-[#fd914d]"
                        : "text-gray-200"
                    }
                  >
                    ★
                  </span>
                ))}
              </div>

              <span className="text-gray-500 text-sm">
                ({reviews?.length} review)
              </span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-bold text-lg mb-4">Reviews ({reviews?.length})</h3>
        {reviews?.map((review, idx) => (
          <ReviewCard key={idx} review={review} />
        ))}
        {reviews?.length === 0 && (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">📝</div>
            <h3 className="text-lg font-semibold text-gray-700">
              No reviews yet
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Once people start sharing their thoughts, you’ll see them here.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
