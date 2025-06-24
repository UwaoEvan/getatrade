import HomeBanner from "./components/Home/HomeBanner";
import HomeCounter from "./components/Home/HomeCounter";
import HowToHire from "./components/Home/HowToHire";
import LookingForLeads from "./components/Home/LookingForLeads";
import Marketing from "./components/Home/Marketing";
import Partners from "./components/Home/Partners";
import WhyGetATrade from "./components/Home/WhyGetATrade";

export default function Home() {
  return (
    <div className="">
      <HomeBanner />
      <Marketing />
      <HomeCounter />
      <HowToHire />
      <WhyGetATrade />
      <Partners />
      <LookingForLeads />
    </div>
  );
}
