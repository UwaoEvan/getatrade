import Image from "next/image";
import working from "@/public/link.jpg";
import Link from "next/link";

export default function LookingForLeads() {
  return (
    <section className="bg-white py-16">
      <div className="w-ful px-4 lg:w-[800px] lg:mx-auto">
        <div className="flex flex-col md:flex-row md:justify-center gap-10">
          <Image
            src={working}
            alt="Tradesperson working"
            className="w-full md:w-1/2 rounded-lg object-cover"
          />
          <div className="md:w-1/2">
            <h2 className="text-xl md:text-4xl font-bold text-gray-900 mb-4">
              Looking for leads?
            </h2>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Grow your business with Getatradelinkltd
            </h3>
            <p className="text-gray-700 mb-6">
              Getatradelinkltd is the reliable way to get more of the work you
              want. Sign up for free to receive a steady stream of local job
              opportunities that match your skills. Take on big jobs or smaller
              gap fillers – it’s up to you.
            </p>
            <Link
              href="/tradesworks-signup"
              className="inline-flex items-center text-black font-medium underline hover:no-underline transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
              Tradespeople join for free
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
