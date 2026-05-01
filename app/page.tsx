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
import { listSlides } from "@/lib/slides";

export default async function HomePage() {
  const slides = await listSlides();
  const items = slides.map((s) => ({
    id: s.id,
    imagePath: s.imagePath,
    alt: s.alt ?? "",
  }));
  return (
    <>
      <HeroSlider slides={items} />
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
