"use client";

import { motion } from "framer-motion";
import { useListingFilter } from "@/components/search/SearchBarContext";

type Property = {
  id: string;
  title: string;
  price: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  image: string;
};

const PROPERTIES_BUCARAMANGA: Property[] = [
  {
    id: "b1",
    title: "Apartamento en Bucaramanga",
    price: "$3'500.000",
    bedrooms: 2,
    bathrooms: 1,
    area: "52 m²",
    image: "https://picsum.photos/seed/b1/400/280",
  },
  {
    id: "b2",
    title: "Apartamento en Bucaramanga",
    price: "$3'500.000",
    bedrooms: 2,
    bathrooms: 1,
    area: "52 m²",
    image: "https://picsum.photos/seed/b2/400/280",
  },
  {
    id: "b3",
    title: "Apartamento en Bucaramanga",
    price: "$3'500.000",
    bedrooms: 2,
    bathrooms: 1,
    area: "52 m²",
    image: "https://picsum.photos/seed/b3/400/280",
  },
  {
    id: "b4",
    title: "Apartamento en Bucaramanga",
    price: "$3'500.000",
    bedrooms: 2,
    bathrooms: 1,
    area: "52 m²",
    image: "https://picsum.photos/seed/b4/400/280",
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
    image: "https://picsum.photos/seed/g1/400/280",
  },
  {
    id: "g2",
    title: "Apartamento en Giron",
    price: "$3'500.000",
    bedrooms: 2,
    bathrooms: 1,
    area: "52 m²",
    image: "https://picsum.photos/seed/g2/400/280",
  },
  {
    id: "g3",
    title: "Apartamento en Giron",
    price: "$3'500.000",
    bedrooms: 2,
    bathrooms: 1,
    area: "52 m²",
    image: "https://picsum.photos/seed/g3/400/280",
  },
  {
    id: "g4",
    title: "Apartamento en Giron",
    price: "$3'500.000",
    bedrooms: 2,
    bathrooms: 1,
    area: "52 m²",
    image: "https://picsum.photos/seed/g4/400/280",
  },
];

function PropertyCard({ property }: { property: Property }) {
  const { activeFilter } = useListingFilter();

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
          <span className="absolute top-2 left-2 z-10 px-2 py-0.5 rounded text-[10px] font-semibold bg-[var(--accent)] text-white shadow-sm">
            {listingLabel}
          </span>
        )}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={property.image}
          alt=""
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <h3 className="font-semibold text-xs mb-0.5 truncate text-[var(--text-primary)]">
        {property.title}
      </h3>
      <div className="flex items-center justify-between gap-1.5 flex-wrap">
        <p className="text-xs font-semibold text-[var(--text-primary)]">
          {property.price}
        </p>
        <div className="flex flex-wrap gap-2 text-[10px] text-[var(--text-secondary)]">
          <span className="flex items-center gap-0.5">
            <span className="material-symbols-outlined text-sm">bed</span>
            {property.bedrooms} Habs.
          </span>
          <span className="flex items-center gap-0.5">
            <span className="material-symbols-outlined text-sm">bathtub</span>
            {property.bathrooms} Baño{property.bathrooms > 1 ? "s" : ""}
          </span>
          <span className="flex items-center gap-0.5">
            <span className="material-symbols-outlined text-sm">square</span>
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
        className="flex items-center justify-between mb-4"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-xl font-display font-bold text-[var(--text-primary)]">
          Propiedades populares en Giron
        </h2>
        <button
          type="button"
          className="flex items-center gap-1 text-[var(--accent)] font-medium hover:underline"
        >
          Ver más
          <span className="material-symbols-outlined text-lg">arrow_forward</span>
        </button>
      </motion.div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {PROPERTIES_GIRON.map((p) => (
          <PropertyCard key={p.id} property={p} />
        ))}
      </div>
    </section>
  );
}
