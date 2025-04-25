import HomeBanner from "./components/Home/HomeBanner";
import HomeCounter from "./components/Home/HomeCounter";
import HowToHire from "./components/Home/HowToHire";
import LookingForLeads from "./components/Home/LookingForLeads";
import PopularTrades from "./components/Home/PopularTrades";
import WhyGetATrade from "./components/Home/WhyGetATrade";

export default function Home() {
  return (
    <div className="">
      <HomeBanner />
      <HomeCounter />
      <HowToHire />
      <WhyGetATrade />
      <PopularTrades />
      <LookingForLeads />
    </div>
  );
}
