import Image from "next/image";
import Roofing from "@/public/root.png";
import Bathroom from "@/public/bathroom.png";
import Plumbing from "@/public/sink.jpg";

export default function PopularTrades() {
  const trades = [
    {
      title: "Roofing",
      description:
        "Are you interested in price information about a job in this service/category? To give you an id...",
      link: "#",
      image: Roofing,
      stats: "16155 roofers in The UK",
    },
    {
      title: "Bathroom Fitting",
      description:
        "Are you interested in price information about a job in this service/category? To give you an id...",
      link: "#",
      image: Bathroom,
      stats: "27711 bathroom fitters in The UK",
    },
    {
      title: "Plumbing",
      description:
        "Curious about the cost of plumbing services? Dive into our comprehensive guides to find pricing...",
      link: "#",
      image: Plumbing,
      stats: "30358 plumbers in The UK",
    },
  ];

  return (
    <section className="bg-gray-100 py-16">
      <div className="w-[880px] mx-auto">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-900">
            Popular trades
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {trades.map((trade, index) => (
              <div
                key={index}
                className="bg-white shadow rounded-lg overflow-hidden flex flex-col justify-between"
              >
                <Image
                  src={trade.image}
                  alt={trade.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 flex-grow">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {trade.title}
                  </h3>
                  <p className="text-gray-700 text-sm">
                    {trade.description}{" "}
                    <a href={trade.link} className="text-black underline">
                      Learn more
                    </a>
                  </p>
                </div>
                <div className="border-t px-4 py-3">
                  <p className="text-sm font-medium text-gray-900">
                    {trade.stats}
                  </p>
                  <button className="mt-2 w-full bg-[#2f76d9] text-white py-2 rounded hover:bg-[#2f76d9] transition">
                    View all
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
