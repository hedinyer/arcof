"use client";

import { HeroCanvas } from "./HeroCanvas";
import { SearchBar } from "@/components/search/SearchBar";

export function Hero() {
  return (
    <section className="w-full relative mb-8 group">
      <HeroCanvas />
      <SearchBar />
    </section>
  );
}
