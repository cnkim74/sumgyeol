import Hero from "@/components/Hero";
import Promise from "@/components/Promise";
import ThreeActs from "@/components/ThreeActs";
import VideoPaths from "@/components/VideoPaths";
import Subscription from "@/components/Subscription";
import Trust from "@/components/Trust";
import B2BLine from "@/components/B2BLine";
import WaitlistSection from "@/components/WaitlistSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Promise />
      <ThreeActs />
      <VideoPaths />
      <Subscription />
      <Trust />
      <B2BLine />
      <WaitlistSection />
    </>
  );
}
