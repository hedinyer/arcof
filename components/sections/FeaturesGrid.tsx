"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useListingFilter } from "@/components/search/SearchBarContext";

const IMG_1 =
  "https://a0.muscache.com/im/pictures/hosting/Hosting-1417554233548575671/original/a08c902a-28cc-4d19-b994-4e4fe7c602e8.jpeg?im_w=960";
const IMG_2 =
  "https://a0.muscache.com/im/pictures/hosting/Hosting-1504475856624208493/original/1ccbb4df-43f8-4f28-887a-3ea56a038f03.jpeg?im_w=960";

type Property = {
  id: string;
  title: string;
  price: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  images: string[];
};

const PROPERTIES_BUCARAMANGA: Property[] = [
  {
    id: "b1",
    title: "Apartamento en Bucaramanga",
    price: "$3'500.000",
    bedrooms: 2,
    bathrooms: 1,
    area: "52 m²",
    images: [IMG_1, IMG_2],
  },
  {
    id: "b2",
    title: "Apartamento en Bucaramanga",
    price: "$3'500.000",
    bedrooms: 2,
    bathrooms: 1,
    area: "52 m²",
    images: [IMG_1, IMG_2],
  },
  {
    id: "b3",
    title: "Apartamento en Bucaramanga",
    price: "$3'500.000",
    bedrooms: 2,
    bathrooms: 1,
    area: "52 m²",
    images: [IMG_1, IMG_2],
  },
  {
    id: "b4",
    title: "Apartamento en Bucaramanga",
    price: "$3'500.000",
    bedrooms: 2,
    bathrooms: 1,
    area: "52 m²",
    images: [IMG_1, IMG_2],
  },
];

const PROPERTIES_GIRON: Property[] = [
  {
    id: "g1",
    title: "Apartamento en Giron",
    price: "$3'500.000",
    bedrooms: 2,
    bathrooms: 1,
    area: "52 m²",
    images: [IMG_1, IMG_2],
  },
  {
    id: "g2",
    title: "Apartamento en Giron",
    price: "$3'500.000",
    bedrooms: 2,
    bathrooms: 1,
    area: "52 m²",
    images: [IMG_1, IMG_2],
  },
  {
    id: "g3",
    title: "Apartamento en Giron",
    price: "$3'500.000",
    bedrooms: 2,
    bathrooms: 1,
    area: "52 m²",
    images: [IMG_1, IMG_2],
  },
  {
    id: "g4",
    title: "Apartamento en Giron",
    price: "$3'500.000",
    bedrooms: 2,
    bathrooms: 1,
    area: "52 m²",
    images: [IMG_1, IMG_2],
  },
];

function PropertyCard({ property }: { property: Property }) {
  const { activeFilter } = useListingFilter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = property.images.length ? property.images : [IMG_1];

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
    activeFilter === "rentar"
      ? "En Renta"
      : activeFilter === "comprar" || activeFilter === "vender"
        ? "En Venta"
        : null;

  return (
    <motion.article
      className="group cursor-pointer"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
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
          <span className="flex items-center gap-0.5">
            <span className="material-symbols-outlined text-base">bed</span>
            {property.bedrooms} Habs.
          </span>
          <span className="flex items-center gap-0.5">
            <span className="material-symbols-outlined text-base">bathtub</span>
            {property.bathrooms} Baño{property.bathrooms > 1 ? "s" : ""}
          </span>
          <span className="flex items-center gap-0.5">
            <span className="material-symbols-outlined text-base">square</span>
            {property.area}
          </span>
        </div>
      </div>
    </motion.article>
  );
}

export function FeaturesGrid() {
  return (
    <section className="mb-10">
      {/* Bucaramanga */}
      <motion.h2
        className="text-xl font-display font-bold mb-4 text-[var(--text-primary)]"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Propiedades populares en Bucaramanga
      </motion.h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {PROPERTIES_BUCARAMANGA.map((p) => (
          <PropertyCard key={p.id} property={p} />
        ))}
      </div>

      {/* Giron */}
      <motion.div
        className="mb-4"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-xl font-display font-bold text-[var(--text-primary)]">
          Propiedades populares en Giron
        </h2>
      </motion.div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {PROPERTIES_GIRON.map((p) => (
          <PropertyCard key={p.id} property={p} />
        ))}
      </div>
    </section>
  );
}
