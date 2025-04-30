import { PRICING } from "@/app/lib/pricing";

type Params = {
  params: Promise<{ category: string; id: string }>;
};

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

export default async function PricingBreakdown({ params }: Params) {
  const { category, id } = await params;
  const contents: Pricing = PRICING;
  const cat = category.replace(/-/g, " ");
  const content = contents[cat]?.categories.find(
    (cat) => cat.route === `/${category}/${id}`,
  );
  return (
    <div className="w-full md:w-[880px] px-4 md:mx-auto">
      <h1 className="font-bold text-2xl mb-4 mt-8">{content?.title || ""}</h1>
      <div
        className="prose prose-lg"
        dangerouslySetInnerHTML={{ __html: content?.content || "" }}
      />
    </div>
  );
}
