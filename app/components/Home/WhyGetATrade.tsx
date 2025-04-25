import Image from "next/image";
import Banner from "@/public/banner.png";

export default function WhyGetATrade() {
  return (
    <section className="bg-white py-16">
      <div className="w-full px-4 lg:w-[880px] lg:mx-auto">
        <h2 className="text-xl md:text-4xl font-bold text-gray-900 mb-4">
          Why Getatradelink is the reliable way
        </h2>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-gray-700 mb-8">
              Hiring a tradesperson when you need one isn’t always easy.
              Getatradelink is the reliable way, helping you hire the right
              tradesperson for your job.
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-black">
                  <span className="text-blue-500 mr-1">|</span>The tradespeople
                  you want
                </h3>
                <p className="text-gray-700 mt-1">
                  Post your job for free to access tradespeople with the skills
                  you need and get responses from those who want to do it. You
                  choose who you want to chat with.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-black">
                  <span className="text-blue-500 mr-1">|</span>Genuine customer
                  reviews
                </h3>
                <p className="text-gray-700 mt-1">
                  Thanks to our robust feedback system, you can read genuine
                  reviews from previous customers, allowing you to make an
                  informed choice about who to hire.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-black">
                  <span className="text-blue-500 mr-1">|</span>You’re in control
                </h3>
                <p className="text-gray-700 mt-1">
                  Review profiles, work history and feedback before making a
                  decision about who to chat with. Only tradespeople you have
                  chosen can contact you.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <Image
              src={Banner}
              alt="Phone showcasing tradespeople"
              className="max-w-sm w-full rounded-lg"
            />
          </div>
        </div>

        <div className="text-center mt-16">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Ready to hire a tradesperson?
          </h3>
          <button className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition">
            Post your job
          </button>
        </div>
      </div>
    </section>
  );
}
