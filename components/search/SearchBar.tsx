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
    <div className="flex flex-col items-center justify-center mt-8 mb-8 pointer-events-none">
      <div className="pointer-events-auto flex items-center gap-8 mb-6 bg-transparent px-8 py-3 rounded-full">
        {filters.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setActiveFilter(f.id)}
            className={`flex items-center gap-3 group transition-colors ${
              activeFilter === f.id
                ? "text-[var(--accent)]"
                : "text-[var(--text-primary)] hover:text-[var(--accent)]"
            }`}
          >
            <img
              src={f.image}
              alt=""
              className={`object-contain shrink-0 ${f.id === "vender" ? "h-32 w-32" : "h-20 w-20"}`}
              width={f.id === "vender" ? 128 : 80}
              height={f.id === "vender" ? 128 : 80}
            />
            <span className="text-base font-bold">{f.label}</span>
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
