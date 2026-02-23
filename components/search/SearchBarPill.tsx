"use client";

import { useRouter } from "next/navigation";
import { useSearchBarForm, useListingFilter, type PropertyType } from "./SearchBarContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type SearchBarPillProps = {
  compact?: boolean;
  "data-search-bar"?: boolean;
};

const filters: { id: "rentar" | "comprar" | "vender"; image: string }[] = [
  { id: "rentar", image: "/rentar.png" },
  { id: "comprar", image: "/comprar.png" },
  { id: "vender", image: "/vender.png" },
];

const propertyTypes: PropertyType[] = [
  "Apartamento",
  "Casas",
  "Consultorios",
  "Oficinas",
  "Locales",
  "Bodegas",
  "Lotes",
  "Fincas",
  "Parqueaderos",
  "Edificios",
  "Apartaestudio",
  "Hotel",
  "Habitacion",
];

const locations = ["Bucaramanga", "Giron", "Piedecuesta"];

export function SearchBarPill({
  compact = false,
  "data-search-bar": dataSearchBar = false,
}: SearchBarPillProps) {
  const router = useRouter();
  const { location, setLocation, propertyType, setPropertyType } = useSearchBarForm();
  const { activeFilter } = useListingFilter();

  const handleSearch = () => {
    if (activeFilter === "rentar") {
      router.push("/propiedades?tipo=arrendar");
    } else if (activeFilter === "comprar") {
      router.push("/propiedades?tipo=comprar");
    } else {
      router.push("/propiedades");
    }
  };

  const paddingY = compact ? "py-1.5" : "py-2 sm:py-2.5";
  const paddingX = compact ? "px-3" : "px-3 sm:px-4 md:px-6";
  const buttonSize = compact ? "w-9 h-9" : "w-10 h-10 sm:w-12 sm:h-12";
  const textSize = compact ? "text-xs" : "text-xs sm:text-sm";
  const maxWidth = compact ? "max-w-3xl" : "max-w-3xl";
  const labelClass = compact ? "text-[10px]" : "text-[10px] sm:text-xs";
  const labelMargin = compact ? "mb-0" : "mb-0.5";

  const activeFilterData = filters.find((f) => f.id === activeFilter);

  return (
    <div
      className={`pointer-events-auto w-full ${maxWidth} mx-2 sm:mx-auto flex items-stretch rounded-full overflow-hidden bg-[var(--background-surface)] shadow-[var(--shadow-search)] border border-[var(--text-secondary)]/10 sm:w-full ${compact ? "min-h-[40px]" : ""}`}
      {...(dataSearchBar ? { "data-search-bar": true } : {})}
    >
      {compact && activeFilterData && (
        <>
          <div className="flex items-center px-3 shrink-0 rounded-l-full">
            <img
              src={activeFilterData.image}
              alt={activeFilterData.id}
              className="h-8 w-8 object-contain"
              width={32}
              height={32}
            />
          </div>
          <div className={`w-px self-stretch bg-[var(--text-secondary)]/20 shrink-0 ${compact ? "my-1" : "my-2"}`} aria-hidden />
        </>
      )}
      <div
        className={`${compact ? "flex-[1.5]" : "flex-[1.5] sm:flex-1"} flex flex-col justify-center ${paddingX} ${paddingY} min-w-0 cursor-pointer hover:bg-black/[0.02] dark:hover:bg-white/[0.03] transition-colors ${compact && activeFilterData ? "" : "rounded-l-full"}`}
      >
        <label className={`block ${labelClass} font-bold text-[var(--text-primary)] ${labelMargin}`}>
          Donde
        </label>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className={`w-full text-left bg-transparent border-none p-0 ${textSize} leading-normal text-[var(--text-primary)] placeholder-[var(--text-secondary)]/70 focus:ring-0 focus:outline-none truncate ${
                !location ? "text-[var(--text-secondary)]/70" : ""
              }`}
            >
              {location || "Explora la zona que buscas"}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="max-h-[300px] overflow-y-auto">
            <DropdownMenuItem
              onClick={() => setLocation("")}
              className={location === "" ? "bg-[var(--background-elevated)]" : ""}
            >
              Todas las zonas
            </DropdownMenuItem>
            {locations.map((loc) => (
              <DropdownMenuItem
                key={loc}
                onClick={() => setLocation(loc)}
                className={location === loc ? "bg-[var(--background-elevated)]" : ""}
              >
                {loc}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className={`w-px self-stretch bg-[var(--text-secondary)]/20 shrink-0 ${compact ? "my-1" : "my-2"}`} aria-hidden />

      <div
        className={`flex-1 flex flex-col justify-center ${paddingX} ${paddingY} min-w-0 cursor-pointer hover:bg-black/[0.02] dark:hover:bg-white/[0.03] transition-colors`}
      >
        <label className={`block ${labelClass} font-bold text-[var(--text-primary)] ${labelMargin}`}>
          Tipo
        </label>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className={`w-full text-left bg-transparent border-none p-0 ${textSize} leading-normal text-[var(--text-primary)] placeholder-[var(--text-secondary)]/70 focus:ring-0 focus:outline-none truncate ${
                !propertyType ? "text-[var(--text-secondary)]/70" : ""
              }`}
            >
              {propertyType || "Tipo de inmueble"}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="max-h-[300px] overflow-y-auto">
            <DropdownMenuItem
              onClick={() => setPropertyType("")}
              className={propertyType === "" ? "bg-[var(--background-elevated)]" : ""}
            >
              Todos los tipos
            </DropdownMenuItem>
            {propertyTypes.map((type) => (
              <DropdownMenuItem
                key={type}
                onClick={() => setPropertyType(type)}
                className={propertyType === type ? "bg-[var(--background-elevated)]" : ""}
              >
                {type}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className={`flex items-center pr-2 ${compact ? "py-0.5" : "py-1.5"} shrink-0`}>
        <button
          type="button"
          onClick={handleSearch}
          className={`bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white rounded-full ${buttonSize} flex items-center justify-center transition-all active:scale-95 shadow-lg shadow-[var(--accent)]/25`}
          aria-label="Buscar"
        >
          <span className={`material-symbols-outlined font-bold ${compact ? "text-xl" : "text-2xl"}`}>
            search
          </span>
        </button>
      </div>
    </div>
  );
}
