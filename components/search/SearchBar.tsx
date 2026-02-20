"use client";

import type { ListingFilterId } from "./SearchBarContext";
import { useListingFilter, useSearchBarScroll } from "./SearchBarContext";
import { SearchBarPill } from "./SearchBarPill";

const filters: { id: ListingFilterId; image: string; label: string }[] = [
  { id: "rentar", image: "/rentar.png", label: "Rentar" },
  { id: "comprar", image: "/comprar.png", label: "Comprar" },
  { id: "vender", image: "/vender.png", label: "Pagar" },
];

export function SearchBar() {
  const { activeFilter, setActiveFilter } = useListingFilter();
  const { showInHeader } = useSearchBarScroll();

  return (
    <div className="flex flex-col items-center justify-center mt-4 mb-4 sm:mt-8 sm:mb-8 pointer-events-none">
      <div className="pointer-events-auto flex items-center justify-center gap-6 sm:gap-4 md:gap-8 mb-4 sm:mb-6 bg-transparent px-3 py-2 sm:px-6 sm:py-3 md:px-8 rounded-full flex-wrap">
        {filters.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setActiveFilter(f.id)}
            className={`flex items-center gap-1.5 sm:gap-2 md:gap-3 group transition-colors ${
              activeFilter === f.id
                ? "text-[var(--accent)]"
                : "text-[var(--text-primary)] hover:text-[var(--accent)]"
            }`}
          >
            <img
              src={f.image}
              alt=""
              className={`object-contain shrink-0 ${
                f.id === "vender"
                  ? "h-16 w-16 sm:h-24 sm:w-24 md:h-32 md:w-32"
                  : "h-10 w-10 sm:h-14 sm:w-14 md:h-20 md:w-20"
              }`}
              width={f.id === "vender" ? 128 : 80}
              height={f.id === "vender" ? 128 : 80}
            />
            <span className="text-xs sm:text-sm md:text-base font-bold whitespace-nowrap">{f.label}</span>
          </button>
        ))}
      </div>

      <div className="w-full" data-search-bar>
        {!showInHeader ? (
          <div>
            <SearchBarPill />
          </div>
        ) : (
          <div className="h-[62px]" aria-hidden />
        )}
      </div>
    </div>
  );
}
