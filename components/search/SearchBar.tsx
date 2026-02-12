"use client";

import { motion } from "framer-motion";
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
      <motion.div
        className="pointer-events-auto flex items-center gap-8 mb-6 bg-transparent px-8 py-3 rounded-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
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
      </motion.div>

      <div className="w-full" data-search-bar>
        {!showInHeader ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <SearchBarPill />
          </motion.div>
        ) : (
          <div className="h-[62px]" aria-hidden />
        )}
      </div>
    </div>
  );
}
