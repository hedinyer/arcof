"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useListingFilter } from "@/components/search/SearchBarContext";
import { supabase } from "@/lib/supabase";

const PLACEHOLDER_IMG =
  "https://a0.muscache.com/im/pictures/hosting/Hosting-1417554233548575671/original/a08c902a-28cc-4d19-b994-4e4fe7c602e8.jpeg?im_w=960";

/** DB row from public.inmuebles */
type InmuebleRow = {
  id: string;
  created_at: string;
  updated_at: string;
  direccion: string | null;
  ciudad: string;
  lat: number | null;
  lng: number | null;
  tipo_oferta: "venta" | "arriendo";
  tipo_inmueble: string;
  area_construida: number | null;
  area_privada: number | null;
  descripcion: string;
  video_url: string | null;
  fotos: { url: string; orden?: number }[] | string[];
  telefono: string | null;
  user_id: string | null;
  estado: string;
  habitaciones: number | null;
  banos: number | null;
  parqueaderos: number | null;
  precio: number | null;
  estrato: number | null;
  piso: number | null;
};

type Property = {
  id: string;
  title: string;
  price: string;
  bedrooms?: number;
  bathrooms?: number;
  area: string;
  images: string[];
  tipo_oferta: "venta" | "arriendo";
};

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}

/** Resolve photo URL: if it's a storage path (no protocol), return public URL from bucket images */
function resolvePhotoUrl(urlOrPath: string): string {
  if (!urlOrPath) return "";
  if (/^https?:\/\//i.test(urlOrPath)) return urlOrPath;
  const path = urlOrPath.startsWith("casas/") ? urlOrPath : `casas/${urlOrPath}`;
  const { data } = supabase.storage.from("images").getPublicUrl(path);
  return data.publicUrl;
}

function formatPrecio(precio: number | null): string {
  if (precio == null || precio <= 0) return "Consultar";
  if (precio >= 1_000_000) return `$${(precio / 1_000_000).toFixed(1)} M`;
  if (precio >= 1_000) return `$${(precio / 1_000).toFixed(0)} K`;
  return `$${precio.toLocaleString("es-CO")}`;
}

function inmuebleToProperty(row: InmuebleRow): Property {
  const rawFotos = Array.isArray(row.fotos) ? row.fotos : [];
  const sorted = [...rawFotos].sort((a, b) => {
    const oA = typeof a === "object" && a && "orden" in a ? (a as { orden?: number }).orden ?? 0 : 0;
    const oB = typeof b === "object" && b && "orden" in b ? (b as { orden?: number }).orden ?? 0 : 0;
    return oA - oB;
  });
  const images = sorted
    .map((f) => (typeof f === "string" ? f : (f as { url: string }).url))
    .filter(Boolean)
    .map(resolvePhotoUrl);
  const areaM2 = row.area_construida ?? row.area_privada;
  const descExcerpt = row.descripcion?.trim()
    ? (row.descripcion.includes(",")
        ? row.descripcion.split(",")[0].trim()
        : row.descripcion.trim())
    : "";
  const title = descExcerpt || `${capitalize(row.tipo_inmueble)} en ${capitalize(row.ciudad)}`;
  return {
    id: row.id,
    title,
    price: formatPrecio(row.precio),
    bedrooms: row.habitaciones ?? undefined,
    bathrooms: row.banos ?? undefined,
    area: areaM2 != null ? `${Number(areaM2)} m²` : "—",
    images,
    tipo_oferta: row.tipo_oferta,
  };
}

function PropertyCard({ property }: { property: Property }) {
  const { activeFilter } = useListingFilter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = property.images.length ? property.images : [PLACEHOLDER_IMG];

  const goTo = useCallback(
    (index: number) => {
      setCurrentIndex((i) => (index + images.length) % images.length);
    },
    [images.length]
  );

  const listingLabel =
    property.tipo_oferta === "arriendo"
      ? "En Renta"
      : property.tipo_oferta === "venta"
        ? "En Venta"
        : null;

  return (
    <article className="group cursor-pointer">
      <div className="relative aspect-[16/10] rounded-md overflow-hidden bg-[var(--background-elevated)] mb-1.5 border border-white/5">
        {listingLabel && (
          <span className="absolute top-2 left-2 z-10 px-2.5 py-1 rounded text-xs font-semibold bg-[var(--accent)] text-white shadow-sm">
            {listingLabel}
          </span>
        )}
        <AnimatePresence mode="wait" initial={false}>
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt=""
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          />
        </AnimatePresence>
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                goTo(currentIndex - 1);
              }}
              className="absolute left-1 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Imagen anterior"
            >
              <span className="material-symbols-outlined text-lg">chevron_left</span>
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                goTo(currentIndex + 1);
              }}
              className="absolute right-1 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Siguiente imagen"
            >
              <span className="material-symbols-outlined text-lg">chevron_right</span>
            </button>
            <div className="absolute bottom-2 left-0 right-0 z-10 flex justify-center gap-1">
              {images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setCurrentIndex(i);
                  }}
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${
                    i === currentIndex ? "bg-white" : "bg-white/50"
                  }`}
                  aria-label={`Imagen ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
      <h3 className="font-semibold text-sm mb-0.5 truncate text-[var(--text-primary)]">
        {property.title}
      </h3>
      <div className="flex items-center justify-between gap-1.5 flex-wrap">
        <p className="text-sm font-semibold text-[var(--text-primary)]">
          {property.price}
        </p>
        <div className="flex flex-wrap gap-2 text-xs text-[var(--text-secondary)]">
          {property.bedrooms != null && (
            <span className="flex items-center gap-0.5">
              <span className="material-symbols-outlined text-base">bed</span>
              {property.bedrooms} Habs.
            </span>
          )}
          {property.bathrooms != null && (
            <span className="flex items-center gap-0.5">
              <span className="material-symbols-outlined text-base">bathtub</span>
              {property.bathrooms} Baño{property.bathrooms > 1 ? "s" : ""}
            </span>
          )}
          <span className="flex items-center gap-0.5">
            <span className="material-symbols-outlined text-base">square</span>
            {property.area}
          </span>
        </div>
      </div>
    </article>
  );
}

export function FeaturesGrid() {
  const { activeFilter } = useListingFilter();
  const [inmuebles, setInmuebles] = useState<InmuebleRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    supabase
      .from("inmuebles")
      .select("*")
      .eq("estado", "publicado")
      .order("created_at", { ascending: false })
      .limit(5000)
      .then(({ data, error: err }) => {
        if (cancelled) return;
        setLoading(false);
        if (err) {
          setError(err.message);
          return;
        }
        setInmuebles((data as InmuebleRow[]) ?? []);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const tipoOfertaFilter: "arriendo" | "venta" | null =
    activeFilter === "rentar"
      ? "arriendo"
      : activeFilter === "comprar" || activeFilter === "vender"
        ? "venta"
        : null;

  const filtered =
    tipoOfertaFilter == null
      ? inmuebles
      : inmuebles.filter((i) => i.tipo_oferta === tipoOfertaFilter);

  // Orden de ciudades para mostrar (coincide con el check de la tabla)
  const CIUDAD_ORDER = ["bucaramanga", "giron", "piedecuesta"] as const;
  const byCity = new Map<string, InmuebleRow[]>();
  for (const row of filtered) {
    const c = row.ciudad?.toLowerCase() ?? "";
    if (!byCity.has(c)) byCity.set(c, []);
    byCity.get(c)!.push(row);
  }
  const citiesWithProps: { ciudad: string; inmuebles: InmuebleRow[] }[] = [];
  for (const ciudad of CIUDAD_ORDER) {
    const list = byCity.get(ciudad);
    if (list?.length) citiesWithProps.push({ ciudad, inmuebles: list.slice(0, 4) });
  }
  // Ciudades no contempladas en CIUDAD_ORDER (por si se agregan después)
  for (const [ciudad, list] of byCity) {
    if (CIUDAD_ORDER.includes(ciudad as (typeof CIUDAD_ORDER)[number])) continue;
    if (list.length) citiesWithProps.push({ ciudad, inmuebles: list.slice(0, 4) });
  }

  if (loading) {
    return (
      <section className="mb-10">
        <h2 className="text-xl font-display font-bold mb-4 text-[var(--text-primary)]">
          Propiedades
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="aspect-[16/10] rounded-md bg-[var(--background-elevated)] animate-pulse"
            />
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="mb-10">
        <h2 className="text-xl font-display font-bold mb-4 text-[var(--text-primary)]">
          Propiedades
        </h2>
        <p className="text-[var(--text-secondary)]">Error al cargar: {error}</p>
      </section>
    );
  }

  return (
    <section className="mb-10">
      <h2 className="text-xl font-display font-bold mb-4 text-[var(--text-primary)]">
        Propiedades
      </h2>
      {citiesWithProps.length === 0 ? (
        <p className="text-[var(--text-secondary)]">
          No hay propiedades publicadas con los filtros seleccionados.
        </p>
      ) : (
        <div className="space-y-10">
          {citiesWithProps.map(({ ciudad, inmuebles: rows }) => (
            <div key={ciudad}>
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
                {capitalize(ciudad)}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {rows.map((row) => (
                  <PropertyCard key={row.id} property={inmuebleToProperty(row)} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
