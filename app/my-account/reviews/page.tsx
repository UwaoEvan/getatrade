const reviews = [
  {
    user: "MyBuilder user from Welling",
    rating: 5,
    date: "4 Sep 2023",
    title: "Walls to be papered and painted.",
    content:
      "Asked Sharna in to do some wallpapering and painting for me. The wallpapering was good, the painting was great. Sharna has some great cutting in skills, even on my wonky walls. Was very impressed. It was a pleasure to have Sharna work here.",
    updated: "11 May 2024",
  },
];

export default function Reviews() {
  return (
    <section className="max-w-2xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold">Overall rating</h2>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold">4.2</span>
              <span className="text-[#fd914d]">★★★★★</span>
              <span className="text-gray-500 text-sm">(5 reviews)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div>
        <h3 className="font-bold text-lg mb-4">Reviews ({reviews.length})</h3>
        {reviews.map((review, idx) => (
          <div key={idx} className="mb-8">
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center mb-2">
                <span className="text-[#fd914d] mr-2">★★★★★</span>
                <span className="text-gray-500 text-xs">
                  Review left on {review.date}
                </span>
              </div>
              <div className="font-bold">{review.title}</div>
              <div className="mt-1 text-gray-700 text-sm">{review.content}</div>
              <div className="text-xs text-gray-400 mt-1">
                (Updated on {review.updated})
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
