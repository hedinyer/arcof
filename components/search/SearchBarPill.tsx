"use client";

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

export function SearchBarPill({
  compact = false,
  "data-search-bar": dataSearchBar = false,
}: SearchBarPillProps) {
  const { location, setLocation, rooms, setRooms, propertyType, setPropertyType } = useSearchBarForm();
  const { activeFilter } = useListingFilter();

  const paddingY = compact ? "py-2" : "py-2.5";
  const paddingX = compact ? "px-4" : "px-6";
  const buttonSize = compact ? "w-10 h-10" : "w-12 h-12";
  const textSize = compact ? "text-xs" : "text-sm";
  const maxWidth = compact ? "max-w-3xl" : "max-w-3xl";

  const activeFilterData = filters.find((f) => f.id === activeFilter);

  return (
    <div
      className={`pointer-events-auto w-full ${maxWidth} mx-auto flex items-stretch rounded-full overflow-hidden bg-[var(--background-surface)] shadow-[var(--shadow-search)] border border-[var(--text-secondary)]/10`}
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
          <div className="w-px self-stretch my-2 bg-[var(--text-secondary)]/20 shrink-0" aria-hidden />
        </>
      )}
      <div
        className={`${compact ? "flex-[1.5]" : "flex-1"} flex flex-col justify-center ${paddingX} ${paddingY} min-w-0 cursor-text hover:bg-black/[0.02] dark:hover:bg-white/[0.03] transition-colors ${compact && activeFilterData ? "" : "rounded-l-full"}`}
      >
        <label className="block text-xs font-bold text-[var(--text-primary)] mb-0.5">
          Donde
        </label>
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className={`w-full bg-transparent border-none p-0 ${textSize} text-[var(--text-primary)] placeholder-[var(--text-secondary)]/70 focus:ring-0 focus:outline-none truncate`}
          placeholder="Explora la zona que buscas"
          type="text"
        />
      </div>

      <div className="w-px self-stretch my-2 bg-[var(--text-secondary)]/20 shrink-0" aria-hidden />

      <div
        className={`flex-1 flex flex-col justify-center ${paddingX} ${paddingY} min-w-0 cursor-pointer hover:bg-black/[0.02] dark:hover:bg-white/[0.03] transition-colors`}
      >
        <label className="block text-xs font-bold text-[var(--text-primary)] mb-0.5">
          Tipo
        </label>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className={`w-full text-left bg-transparent border-none p-0 ${textSize} text-[var(--text-primary)] placeholder-[var(--text-secondary)]/70 focus:ring-0 focus:outline-none truncate ${
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

      <div className="w-px self-stretch my-2 bg-[var(--text-secondary)]/20 shrink-0" aria-hidden />

      <div
        className={`flex-1 flex flex-col justify-center ${paddingX} ${paddingY} min-w-0 cursor-text hover:bg-black/[0.02] dark:hover:bg-white/[0.03] transition-colors`}
      >
        <label
          htmlFor={compact ? "search-rooms-header" : "search-rooms"}
          className="block text-xs font-bold text-[var(--text-primary)] mb-0.5"
        >
          Habitaciones
        </label>
        <input
          id={compact ? "search-rooms-header" : "search-rooms"}
          inputMode="numeric"
          pattern="[0-9]*"
          min={1}
          max={99}
          value={rooms}
          onChange={(e) => {
            const v = e.target.value.replace(/\D/g, "");
            if (v === "" || (Number(v) >= 1 && Number(v) <= 99)) setRooms(v);
          }}
          className={`w-full bg-transparent border-none p-0 ${textSize} text-[var(--text-primary)] placeholder-[var(--text-secondary)]/70 focus:ring-0 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
          placeholder="Cuantos cuartos buscas?"
          type="text"
          aria-label="Número de habitaciones"
        />
      </div>

      <div className={`flex items-center pr-2 ${compact ? "py-1" : "py-1.5"} shrink-0`}>
        <button
          type="button"
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
