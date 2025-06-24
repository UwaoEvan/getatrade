export default function Marketing() {
  return (
    <div className="bg-gray-100 py-12">
      <div className="w-full px-4 lg:w-[880px] md:mx-auto flex xs:flex-col justify-between items-center md:gap-24 text-center">
        <section className="px-6 py-12 md:py-20 text-gray-900">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-xl md:text-5xl font-bold mb-4">
              A Platform Built by Real Trades –
              <span className="block text-primary">Not Corporations</span>
            </h2>

            <p className="text-lg md:text-xl mt-6 text-gray-700">
              Sick of overpriced leads, freebie hunters, and fake reviews?
              <br />
              <strong className="block mt-4 text-gray-900">So were we.</strong>
            </p>

            <p className="text-lg md:text-xl mt-6 text-gray-800">
              That&apos;s why{" "}
              <span className="font-semibold text-primary">Getatrade Link</span>{" "}
              charges just
              <span className="font-bold"> £10 per shortlist</span> – no monthly
              fees, no tricks, no nonsense.
            </p>

            <ul className="mt-8 space-y-3 text-left text-lg md:text-xl max-w-md mx-auto">
              <li className="flex items-start">
                <span className="text-green-600 font-bold mr-2">✓</span> Real
                customers.
              </li>
              <li className="flex items-start">
                <span className="text-green-600 font-bold mr-2">✓</span> Real
                trades.
              </li>
              <li className="flex items-start">
                <span className="text-green-600 font-bold mr-2">•</span> A real
                chance to win work without wasting your time or money.
              </li>
            </ul>

            <blockquote className="mt-12 text-xl md:text-2xl font-medium text-gray-800 italic">
              Built by tradespeople, for tradespeople. <br />
              We&apos;re not just different – we&apos;re fair.
            </blockquote>
          </div>
        </section>
      </div>
    </div>
  );
}
