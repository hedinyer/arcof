"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";

export type ListingFilterId = "rentar" | "comprar" | "vender";

type ListingFilterContextValue = {
  activeFilter: ListingFilterId;
  setActiveFilter: (id: ListingFilterId) => void;
};

const ListingFilterContext = createContext<ListingFilterContextValue | null>(
  null
);

export function useListingFilter() {
  const ctx = useContext(ListingFilterContext);
  if (!ctx)
    return {
      activeFilter: "rentar" as ListingFilterId,
      setActiveFilter: () => {},
    };
  return ctx;
}

export function ListingFilterProvider({ children }: { children: ReactNode }) {
  const [activeFilter, setActiveFilter] = useState<ListingFilterId>("rentar");
  return (
    <ListingFilterContext.Provider value={{ activeFilter, setActiveFilter }}>
      {children}
    </ListingFilterContext.Provider>
  );
}

type SearchBarFormContextValue = {
  location: string;
  setLocation: (v: string) => void;
  rooms: string;
  setRooms: (v: string) => void;
};

const SearchBarFormContext = createContext<SearchBarFormContextValue | null>(
  null
);

export function useSearchBarForm() {
  const ctx = useContext(SearchBarFormContext);
  if (!ctx) throw new Error("useSearchBarForm must be used within SearchBarFormProvider");
  return ctx;
}

export function SearchBarFormProvider({ children }: { children: ReactNode }) {
  const [location, setLocation] = useState("");
  const [rooms, setRooms] = useState("");
  return (
    <SearchBarFormContext.Provider
      value={{ location, setLocation, rooms, setRooms }}
    >
      {children}
    </SearchBarFormContext.Provider>
  );
}

const HEADER_THRESHOLD = 100;

type SearchBarScrollContextValue = {
  showInHeader: boolean;
};

const SearchBarScrollContext = createContext<SearchBarScrollContextValue | null>(
  null
);

export function useSearchBarScroll() {
  const ctx = useContext(SearchBarScrollContext);
  if (!ctx) return { showInHeader: false };
  return ctx;
}

export function SearchBarScrollProvider({ children }: { children: ReactNode }) {
  const [showInHeader, setShowInHeader] = useState(false);

  useEffect(() => {
    function onScroll() {
      const el = document.querySelector("[data-search-bar]");
      if (!el) return;
      const top = el.getBoundingClientRect().top;
      setShowInHeader(top < HEADER_THRESHOLD);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <SearchBarScrollContext.Provider value={{ showInHeader }}>
      {children}
    </SearchBarScrollContext.Provider>
  );
}
