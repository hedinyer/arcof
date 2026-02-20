import { Hero } from "@/components/hero";
import { SearchBar } from "@/components/search/SearchBar";
import { FeaturesGrid } from "@/components/sections/FeaturesGrid";
import { DataSection } from "@/components/sections/DataSection";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <main className="pt-20 px-6 md:px-12 pb-4 max-w-[1920px] mx-auto">
        <SearchBar />
        <FeaturesGrid />
        <DataSection />
      </main>
      <Footer />
    </div>
  );
}
