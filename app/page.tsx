import HeroSlider from "@/components/HeroSlider";
import Promise from "@/components/Promise";
import ThreeActs from "@/components/ThreeActs";
import Subscription from "@/components/Subscription";
import Trust from "@/components/Trust";

export default function HomePage() {
  return (
    <div className="dark-page">
      <HeroSlider />
      <Promise />
      <ThreeActs />
      <Trust />
      <Subscription />
    </div>
  );
}
