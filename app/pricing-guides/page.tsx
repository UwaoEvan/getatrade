import Link from "next/link";
import { PRICING } from "../lib/pricing";

interface Pricing {
  [category: string]: {
    categories: Category[];
  };
}

interface Category {
  label: string;
  title: string;
  content: string;
  route: string;
}

export default function Pricing() {
  const contents: Pricing = PRICING;
  return (
    <div className="bg-white py-16 px-4">
      <div className="w-full md:w-[880px] mx-auto">
        <h1 className="font-bold text-2xl md:text-2xl">
          View pricing information for all jobs
        </h1>
        <p className="my-4">
          Want to get an estimate for your project? We keep track of price
          estimates for lots of jobs.
        </p>
        <div>
          {Object.keys(PRICING).map((obj) => (
            <div key={obj}>
              <h6 className="font-bold text-xl my-6">{obj}</h6>
              <div className="flex justify-between flex-wrap">
                {contents[obj].categories.map((cat) => (
                  <Link
                    key={cat.route}
                    href={`/pricing-guides/${cat.route}`}
                    className="min-w-[100px] text-sm md:text-lg text-[#2f76d9] border-b-1 border-b-[#2f76d9] py-2 mb-2 hover:cursor-pointer"
                  >
                    {cat.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
