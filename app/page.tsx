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
import { listSlides, type Slide } from "@/lib/slides";

export default async function HomePage() {
  let slides: Slide[] = [];
  try {
    slides = await listSlides();
  } catch (err) {
    // DB 접속 실패해도 홈은 항상 떠야 함 — HeroSlider 가 fallback 그라디언트로 대체.
    console.error("[home] listSlides failed, using fallback", err);
  }
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
