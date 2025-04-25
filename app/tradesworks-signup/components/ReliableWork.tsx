import Link from "next/link";

export default function ReliableWork() {
  return (
    <div className="w-full md:w-[880px] mx-auto bg-white text-gray-900 px-4 md:px-16 py-12 space-y-16">
      <section className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-semibold mb-4">
          Ready to find work the reliable way?
        </h2>
        <p className="text-lg text-gray-600">
          There’s lots of demand for good tradespeople but finding exactly the
          work you want when you want it isn’t always easy. <br />
          MyBuilder is the reliable solution, ensuring you get leads that are
          right for you.
        </p>
      </section>

      <section className="flex flex-wrap gap-10 max-w-6xl mx-auto text-sm md:text-base">
        <div>
          <h3 className="font-semibold border-l-4 border-[#2f76d9] pl-3 mb-2">
            All the work you need
          </h3>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li>150,000 jobs posted every month</li>
            <li>Only get leads that match your skills</li>
            <li>Choose your work location</li>
            <li>Take on big or small jobs</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold border-l-4 border-[#2f76d9] pl-3 mb-2">
            You&apos;re in control
          </h3>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li>Join for free with no commitment</li>
            <li>Respond to leads when it suits you</li>
            <li>Express interest in as many jobs as you want</li>
            <li>Only pay when shortlisted</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold border-l-4 border-[#2f76d9] pl-3 mb-2">
            Grow your reputation
          </h3>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li>Create a free profile</li>
            <li>Showcase skills & experience</li>
            <li>Build trust with customer reviews</li>
            <li>Attract more clients</li>
          </ul>
        </div>
      </section>

      <section className="text-center space-y-4">
        <h3 className="text-2xl font-semibold">Say yes to work you want</h3>
        <Link
          href="/tradesworks-signup"
          className="bg-[#2f76d9] hover:cursor-pointer text-white px-6 py-3 rounded-md font-medium inline-block transition"
        >
          Join for free
        </Link>
      </section>
    </div>
  );
}
