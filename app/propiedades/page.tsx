"use client";

import { useState, useCallback, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { Hero } from "@/components/hero";
import { Footer } from "@/components/layout/Footer";
import { useSearchBarForm, type PropertyType } from "@/components/search/SearchBarContext";

const PLACEHOLDER_IMG =
  "https://a0.muscache.com/im/pictures/hosting/Hosting-1417554233548575671/original/a08c902a-28cc-4d19-b994-4e4fe7c602e8.jpeg?im_w=960";

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
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = property.images.length ? property.images : [PLACEHOLDER_IMG];

  const goTo = useCallback(
    (index: number) => {
      setCurrentIndex((i) => (index + images.length) % images.length);
    },
    [images.length]
  );

  useEffect(() => {
    if (images.length <= 1) return;
    const id = setInterval(() => goTo(currentIndex + 1), 4000);
    return () => clearInterval(id);
  }, [currentIndex, images.length, goTo]);

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
        <p className="text-sm font-semibold text-[var(--text-primary)]">{property.price}</p>
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

/** Map URL tipo (arrendar | comprar) to DB tipo_oferta (arriendo | venta) */
function getTipoOfertaFromSearch(tipo: string | null): "arriendo" | "venta" | null {
  if (tipo === "arrendar") return "arriendo";
  if (tipo === "comprar") return "venta";
  return null;
}

/** Map SearchBar location (e.g. "Bucaramanga") to DB ciudad (lowercase) */
function locationToCiudad(location: string): string | null {
  if (!location.trim()) return null;
  const normalized = location.trim().toLowerCase();
  if (["bucaramanga", "giron", "piedecuesta"].includes(normalized)) return normalized;
  return null;
}

/** Map SearchBar PropertyType to DB tipo_inmueble */
const PROPERTY_TYPE_TO_DB: Partial<Record<PropertyType, string>> = {
  Apartamento: "apartamento",
  Casas: "casa",
  Consultorios: "oficina",
  Oficinas: "oficina",
  Locales: "local",
  Bodegas: "bodega",
  Lotes: "lote",
  Fincas: "finca",
  Apartaestudio: "apartamento",
};

function propertyTypeToTipoInmueble(propertyType: PropertyType | ""): string | null {
  if (!propertyType) return null;
  return PROPERTY_TYPE_TO_DB[propertyType] ?? null;
}

export default function PropiedadesPage() {
  const searchParams = useSearchParams();
  const tipo = searchParams.get("tipo");
  const tipoOferta = getTipoOfertaFromSearch(tipo);
  const { location, propertyType } = useSearchBarForm();

  const ciudadFilter = locationToCiudad(location);
  const tipoInmuebleFilter = propertyTypeToTipoInmueble(propertyType);

  const [inmuebles, setInmuebles] = useState<InmuebleRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    let query = supabase
      .from("inmuebles")
      .select("*")
      .eq("estado", "publicado")
      .order("created_at", { ascending: false });

    if (tipoOferta) {
      query = query.eq("tipo_oferta", tipoOferta);
    }
    if (ciudadFilter) {
      query = query.eq("ciudad", ciudadFilter);
    }
    if (tipoInmuebleFilter) {
      query = query.eq("tipo_inmueble", tipoInmuebleFilter);
    }

    query.limit(5000).then(({ data, error: err }) => {
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
  }, [tipoOferta, ciudadFilter, tipoInmuebleFilter]);

  const pageTitle =
    tipoOferta === "arriendo"
      ? "Propiedades en arriendo"
      : tipoOferta === "venta"
        ? "Propiedades en venta"
        : "Propiedades";

  const hasFilters = !!ciudadFilter || !!propertyType;

  return (
    <div className="min-h-screen bg-background">
      <Hero variant="propiedades" />
      <main className="pt-12 pb-12 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <h1 className="text-2xl font-display font-bold text-[var(--text-primary)]">
            {pageTitle}
          </h1>
          <div className="flex items-center gap-1 rounded-full bg-white/80 dark:bg-[var(--background-surface)] px-2 py-1 ring-1 ring-gray-300/40">
            <Link
              href="/propiedades?tipo=arrendar"
              className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${
                tipo === "arrendar"
                  ? "bg-[var(--accent)] text-white"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              Arrendar
            </Link>
            <Link
              href="/propiedades?tipo=comprar"
              className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${
                tipo === "comprar"
                  ? "bg-[var(--accent)] text-white"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              Comprar
            </Link>
          </div>
        </div>

        {hasFilters && (
          <div className="flex flex-wrap items-center gap-2 mb-4 text-sm text-[var(--text-secondary)]">
            <span className="font-medium text-[var(--text-primary)]">Filtros:</span>
            {ciudadFilter && (
              <span className="inline-flex items-center gap-1 rounded-full bg-[var(--background-surface)] px-3 py-1 ring-1 ring-[var(--text-secondary)]/20">
                <span className="material-symbols-outlined text-base">location_on</span>
                {capitalize(ciudadFilter)}
              </span>
            )}
            {propertyType && (
              <span className="inline-flex items-center gap-1 rounded-full bg-[var(--background-surface)] px-3 py-1 ring-1 ring-[var(--text-secondary)]/20">
                <span className="material-symbols-outlined text-base">home</span>
                {propertyType}
              </span>
            )}
          </div>
        )}

        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="aspect-[16/10] rounded-md bg-[var(--background-elevated)] animate-pulse"
              />
            ))}
          </div>
        )}

        {!loading && error && (
          <p className="text-[var(--text-secondary)]">Error al cargar: {error}</p>
        )}

        {!loading && !error && inmuebles.length === 0 && (
          <p className="text-[var(--text-secondary)]">
            No hay propiedades publicadas
            {tipoOferta === "arriendo"
              ? " en arriendo"
              : tipoOferta === "venta"
                ? " en venta"
                : ""}
            .
          </p>
        )}

        {!loading && !error && inmuebles.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {inmuebles.map((row) => (
              <Link key={row.id} href={`/propiedades/${row.id}`}>
                <PropertyCard property={inmuebleToProperty(row)} />
              </Link>
            ))}
          </div>
        )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
