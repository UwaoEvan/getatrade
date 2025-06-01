"use client";
import Image from "next/image";
import Partner1 from "@/public/partner1.jpg";
import Partner2 from "@/public/partner2.jpg";

export default function Partners() {
  const partners = [
    {
      name: "Partner A",
      description:
        "Leading provider of quality construction services across the UK.",
      link: "#",
      image: Partner1,
    },
    {
      name: "Partner B",
      description:
        "Innovative bathroom and plumbing solutions with nationwide coverage.",
      link: "#",
      image: Partner2,
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
                  className="w-full h-48 object-contain p-4 bg-white"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
