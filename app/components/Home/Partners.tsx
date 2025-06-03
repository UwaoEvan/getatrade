"use client";
import Image from "next/image";
import Partner1 from "@/public/partner1.jpg";
import Partner2 from "@/public/partner2.jpg";

export default function Partners() {
  const partners = [
    {
      name: "Proud Flagship Partner of GetTrade Link",
      description:
        "Setting the standard in quality and reliability on the UK's trusted trades plaform.",
      link: "https://www.mckenzieplasteringanddecoratingservice.com/",
      image: Partner2,
    },
    {
      name: "B&S Building Supplies",
      // description:
      //   "Leading provider of quality construction services across the UK.",
      link: "https://www.bsbuildingsupplies.co.uk/",
      image: Partner1,
    },
  ];

  return (
    <section className="bg-gray-100 py-16">
      <div className="w-full px-4 lg:w-[880px] lg:mx-auto">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl md:text-4xl font-bold text-center mb-10 text-gray-900">
            Our Trusted Partners
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="bg-white shadow rounded-lg overflow-hidden flex flex-col justify-between"
              >
                <Image
                  src={partner.image}
                  alt={partner.name}
                  className="w-full h-48 object-cover p-4 bg-white"
                />
                <div className="p-4 flex-grow">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {partner.name}
                  </h3>
                  <p className="text-gray-700 text-sm">
                    {partner.description}{" "}
                    {/* <a href={partner.link} className="text-black underline">
                      Learn more
                    </a> */}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
