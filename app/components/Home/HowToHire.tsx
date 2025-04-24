import Image from "next/image";
import Step1 from "@/public/step1.png";
import Step2 from "@/public/step2.png";
import Step3 from "@/public/step3.png";

export default function HowToHire() {
  const steps = [
    {
      step: 'STEP 1',
      title: 'Post your job for free',
      img: Step1
    },
    {
      step: 'STEP 2',
      title: 'Tradespeople respond',
      img: Step2
    },
    {
      step: 'STEP 3',
      title: 'Review profiles and choose',
      img: Step3
    },
  ];

  return (
    <section className="bg-gray-100 py-16">
      <div className="text-center w-full px-4 lg:w-[880px] lg:mx-auto">
        <h2 className="text-xl md:text-4xl font-bold text-gray-900 mb-12">
          How to hire the right tradesperson
        </h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <Image src={item.img} alt={item.title} className="w-40 h-40 object-contain mb-4" />
              <p className="text-[#2f76d9] font-semibold">{item.step}</p>
              <p className="text-lg font-semibold text-gray-900 mt-1">{item.title}</p>
            </div>
          ))}
        </div>
        <button className="mt-10 px-6 py-3 border border-[#2f76d9] text-[#2f76d9] font-medium rounded hover:bg-purple-100 transition">
          See how it works
        </button>
      </div>
    </section>
  );
}
