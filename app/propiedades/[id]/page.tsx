"use client";

import { useState, useCallback, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { Hero } from "@/components/hero";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { LocationMap, type CiudadKey } from "@/components/map/LocationMap";

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
  titulo: string | null;
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

function getImages(row: InmuebleRow): string[] {
  const rawFotos = Array.isArray(row.fotos) ? row.fotos : [];
  const sorted = [...rawFotos].sort((a, b) => {
    const oA = typeof a === "object" && a && "orden" in a ? (a as { orden?: number }).orden ?? 0 : 0;
    const oB = typeof b === "object" && b && "orden" in b ? (b as { orden?: number }).orden ?? 0 : 0;
    return oA - oB;
  });
  return sorted
    .map((f) => (typeof f === "string" ? f : (f as { url: string }).url))
    .filter(Boolean)
    .map(resolvePhotoUrl);
}

function getTitle(row: InmuebleRow): string {
  if (row.titulo?.trim()) return row.titulo.trim();
  const descExcerpt = row.descripcion?.trim()
    ? (row.descripcion.includes(",")
        ? row.descripcion.split(",")[0].trim()
        : row.descripcion.trim())
    : "";
  return descExcerpt || `${capitalize(row.tipo_inmueble)} en ${capitalize(row.ciudad)}`;
}

/** Extrae el ID de un enlace de YouTube para usar en embed */
function getYoutubeVideoId(url: string | null): string | null {
  if (!url?.trim()) return null;
  const u = url.trim();
  const watchMatch = u.match(/(?:youtube\.com\/watch\?v=|youtube\.com\/embed\/|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return watchMatch ? watchMatch[1] : null;
}

export default function PropiedadPage() {
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : null;
  const [inmueble, setInmueble] = useState<InmuebleRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [galleryIndex, setGalleryIndex] = useState(0);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      setError("ID de propiedad no válido");
      return;
    }
    let cancelled = false;
    setLoading(true);
    setError(null);
    supabase
      .from("inmuebles")
      .select("*")
      .eq("id", id)
      .eq("estado", "publicado")
      .single()
      .then(({ data, error: err }) => {
        if (cancelled) return;
        setLoading(false);
        if (err) {
          setError(err.code === "PGRST116" ? "Propiedad no encontrada" : err.message);
          return;
        }
        setInmueble((data as InmuebleRow) ?? null);
      })
      .catch((e: unknown) => {
        if (cancelled) return;
        setLoading(false);
        setError(e instanceof Error ? e.message : "Error al cargar la propiedad");
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  const images = inmueble ? getImages(inmueble) : [];
  const displayImages = images.length ? images : [PLACEHOLDER_IMG];
  const title = inmueble ? getTitle(inmueble) : "";
  const isArriendo = inmueble?.tipo_oferta === "arriendo";
  const shortId = inmueble?.id ? inmueble.id.slice(0, 13) : "";
  const whatsappHref = inmueble?.telefono
    ? `https://wa.me/57${inmueble.telefono.replace(/\D/g, "")}?text=${encodeURIComponent(
        `Hola, me interesa esta propiedad (ID: ${shortId}): ${title}`
      )}`
    : null;
  const mensajesHref = inmueble
    ? `/mensajes?inmuebleId=${inmueble.id}&inmuebleTitulo=${encodeURIComponent(title)}`
    : "/mensajes";
  const rentLabel = (
    <span className="inline-flex items-center gap-2">
      <svg
        className="w-6 h-6"
        viewBox="0 0 24 24"
        aria-hidden="true"
        focusable="false"
      >
        <path
          fill="currentColor"
          d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"
        />
      </svg>
      <span className="text-lg md:text-xl font-bold">Quiero arrendarlo</span>
    </span>
  );

  const goTo = useCallback(
    (index: number) => {
      setGalleryIndex((i) => (index + displayImages.length) % displayImages.length);
    },
    [displayImages.length]
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Hero variant="propiedades" />
        <main className="pt-12 pb-12 px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="aspect-[16/10] rounded-xl bg-background-elevated animate-pulse mb-6" />
            <div className="h-8 w-3/4 bg-background-elevated animate-pulse rounded mb-4" />
            <div className="h-6 w-1/4 bg-background-elevated animate-pulse rounded" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !inmueble) {
    return (
      <div className="min-h-screen bg-background">
        <Hero variant="propiedades" />
        <main className="pt-12 pb-12 px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-text-secondary mb-4">{error ?? "Propiedad no encontrada"}</p>
            <Button asChild variant="outline">
              <Link href="/propiedades">Ver todas las propiedades</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const areaM2 = inmueble.area_construida ?? inmueble.area_privada;
  const youtubeId = getYoutubeVideoId(inmueble.video_url);
  const hasCoords = inmueble.lat != null && inmueble.lng != null;
  const mapCenterCity: CiudadKey =
    inmueble.ciudad?.toLowerCase() === "giron"
      ? "giron"
      : inmueble.ciudad?.toLowerCase() === "piedecuesta"
        ? "piedecuesta"
        : "bucaramanga";

  return (
    <div className="min-h-screen bg-background">
      <Hero variant="propiedades" />
      <main className="pt-12 pb-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/propiedades"
            className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary mb-6"
          >
            <span className="material-symbols-outlined text-lg">arrow_back</span>
            Volver a propiedades
          </Link>

          {/* Gallery */}
          <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-background-elevated mb-6 border border-neutral-200/80">
            <span className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-lg text-sm font-semibold bg-accent text-white shadow">
              {isArriendo ? "En Renta" : "En Venta"}
            </span>
            <AnimatePresence mode="wait" initial={false}>
              <motion.img
                key={galleryIndex}
                src={displayImages[galleryIndex]}
                alt=""
                className="w-full h-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            </AnimatePresence>
            {displayImages.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => goTo(galleryIndex - 1)}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
                  aria-label="Imagen anterior"
                >
                  <span className="material-symbols-outlined">chevron_left</span>
                </button>
                <button
                  type="button"
                  onClick={() => goTo(galleryIndex + 1)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
                  aria-label="Siguiente imagen"
                >
                  <span className="material-symbols-outlined">chevron_right</span>
                </button>
                <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
                  {displayImages.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setGalleryIndex(i)}
                      className={`h-2 rounded-full transition-all ${
                        i === galleryIndex ? "w-6 bg-white" : "w-2 bg-white/50 hover:bg-white/70"
                      }`}
                      aria-label={`Imagen ${i + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          <h1 className="text-2xl md:text-3xl font-display font-bold text-text-primary mb-1">
            {title}
          </h1>
          <p className="text-sm text-text-secondary mb-2">ID: {shortId}</p>
          <p className="text-xl font-semibold text-accent mb-6">
            {formatPrecio(inmueble.precio)}
            {isArriendo && <span className="text-base font-normal text-text-secondary"> / mes</span>}
          </p>

          {/* Features */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 p-4 rounded-xl bg-background-elevated border border-neutral-200/80">
            {inmueble.habitaciones != null && (
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-text-secondary">bed</span>
                <span className="text-sm text-text-primary">{inmueble.habitaciones} Hab.</span>
              </div>
            )}
            {inmueble.banos != null && (
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-text-secondary">bathtub</span>
                <span className="text-sm text-text-primary">{inmueble.banos} Baño(s)</span>
              </div>
            )}
            {inmueble.parqueaderos != null && (
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-text-secondary">local_parking</span>
                <span className="text-sm text-text-primary">{inmueble.parqueaderos} Parqueadero(s)</span>
              </div>
            )}
            {areaM2 != null && (
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-text-secondary">square</span>
                <span className="text-sm text-text-primary">{Number(areaM2)} m²</span>
              </div>
            )}
            {inmueble.estrato != null && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-text-secondary">Estrato</span>
                <span className="text-sm text-text-primary">{inmueble.estrato}</span>
              </div>
            )}
            {inmueble.piso != null && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-text-secondary">Piso</span>
                <span className="text-sm text-text-primary">{inmueble.piso}</span>
              </div>
            )}
          </div>

          {/* Location */}
          {(inmueble.direccion || inmueble.ciudad) && (
            <div className="flex items-start gap-2 mb-6 text-text-secondary">
              <span className="material-symbols-outlined mt-0.5">location_on</span>
              <div>
                {inmueble.direccion && <p className="text-text-primary">{inmueble.direccion}</p>}
                <p>{capitalize(inmueble.ciudad)}</p>
              </div>
            </div>
          )}

          {/* Description */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-text-primary mb-2">Descripción</h2>
            <p className="text-text-secondary whitespace-pre-line">{inmueble.descripcion || "Sin descripción."}</p>
          </div>

          {/* Video (YouTube) */}
          {youtubeId && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-text-primary mb-2">Video del inmueble</h2>
              <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-background-elevated border border-neutral-200/80">
                <iframe
                  src={`https://www.youtube.com/embed/${youtubeId}?rel=0`}
                  title="Video del inmueble"
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          )}

          {/* Map (Mapbox) */}
          {(inmueble.ciudad || hasCoords) && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-text-primary mb-2">Ubicación</h2>
              <LocationMap
                className="rounded-xl border border-neutral-200/80"
                centerCity={mapCenterCity}
                selectedLat={inmueble.lat}
                selectedLng={inmueble.lng}
                flyToMarker={hasCoords ? 1 : 0}
              />
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-wrap justify-center gap-3 pt-6 border-t border-neutral-200/80">
            {whatsappHref ? (
              <Button
                asChild
                size="lg"
                className="bg-[#722F37] hover:bg-[#5a262d] h-16 md:h-20 px-12 md:px-16 rounded-lg min-w-[260px] md:min-w-[300px] text-white whitespace-nowrap flex-nowrap"
              >
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                  {rentLabel}
                </a>
              </Button>
            ) : (
              <Button
                asChild
                size="lg"
                className="bg-[#722F37] hover:bg-[#5a262d] h-16 md:h-20 px-12 md:px-16 rounded-lg min-w-[260px] md:min-w-[300px] text-white whitespace-nowrap flex-nowrap"
              >
                <Link href={mensajesHref}>{rentLabel}</Link>
              </Button>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
