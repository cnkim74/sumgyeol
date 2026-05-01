import HeroSlider from "@/components/HeroSlider";
import VideoPreview from "@/components/VideoPreview";
import Promise from "@/components/Promise";
import ThreeActs from "@/components/ThreeActs";
import Showcase from "@/components/Showcase";
import VideoPaths from "@/components/VideoPaths";
import Subscription from "@/components/Subscription";
import Trust from "@/components/Trust";
import B2BLine from "@/components/B2BLine";
import WaitlistSection from "@/components/WaitlistSection";

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <VideoPreview />
      <Promise />
      <ThreeActs />
      <Showcase />
      <VideoPaths />
      <Subscription />
      <Trust />
      <B2BLine />
      <WaitlistSection />
    </>
  );
}
