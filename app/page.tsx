import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/hero";
import { FeaturesGrid } from "@/components/sections/FeaturesGrid";
import { DataSection } from "@/components/sections/DataSection";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Header />
      <main className="pt-24 px-6 md:px-12 pb-20 max-w-[1920px] mx-auto">
        <Hero />
        <FeaturesGrid />
        <DataSection />
      </main>
      <Footer />
    </div>
  );
}
