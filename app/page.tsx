import { listSlides } from "@/lib/slides";
import HeroSlider from "@/components/HeroSlider";
import FeaturedProducts from "@/components/FeaturedProducts";
import Promise from "@/components/Promise";
import ThreeActs from "@/components/ThreeActs";
import FamilyConnect from "@/components/FamilyConnect";
import Trust from "@/components/Trust";
import Subscription from "@/components/Subscription";

export default async function HomePage() {
  const dbSlides = (await listSlides().catch(() => [])).map((s) => ({
    id: s.id,
    imagePath: s.imagePath,
    alt: s.alt ?? undefined,
  }));

  return (
    <div className="dark-page">
      <HeroSlider slides={dbSlides} />
      <FeaturedProducts />
      <Promise />
      <ThreeActs />
      <FamilyConnect />
      <Trust />
      <Subscription />
    </div>
  );
}
