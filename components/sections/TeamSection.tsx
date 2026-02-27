"use client";

import Image from "next/image";
import { useState } from "react";

export type TeamMember = {
  id: string;
  name: string;
  position: string;
  imagePath: string; // e.g. "/team/director.jpg"
  featured?: boolean;
};

const defaultTeam: TeamMember[] = [
  {
    id: "1",
    name: "Tu nombre",
    position: "Director General",
    imagePath: "/team/director.jpg",
    featured: true,
  },
  {
    id: "2",
    name: "Nombre asesor",
    position: "Asesor Comercial",
    imagePath: "/team/asesor-1.jpg",
  },
  {
    id: "3",
    name: "Nombre asesor",
    position: "Asesor Comercial",
    imagePath: "/team/asesor-2.jpg",
  },
  {
    id: "4",
    name: "Nombre asesor",
    position: "Administración de Arriendos",
    imagePath: "/team/asesor-3.jpg",
  },
  {
    id: "5",
    name: "Nombre asesor",
    position: "Avalúos y Gestión",
    imagePath: "/team/asesor-4.jpg",
  },
];

function TeamCard({
  member,
  size = "default",
}: {
  member: TeamMember;
  size?: "featured" | "default";
}) {
  const [imgError, setImgError] = useState(false);
  const initials = member.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const isFeatured = size === "featured";

  return (
    <article
      className={`group relative overflow-hidden rounded-3xl border border-neutral-200/80 bg-background-elevated/70 backdrop-blur-sm ${
        isFeatured
          ? "min-h-[320px] md:min-h-[380px]"
          : "aspect-[4/5] min-h-[260px] sm:min-h-0"
      } shadow-[0_18px_45px_rgba(15,23,42,0.35)] hover:shadow-[0_30px_80px_rgba(15,23,42,0.65)] transition-all duration-500 hover:-translate-y-2 hover:border-accent/70`}
    >
      <div className="pointer-events-none absolute inset-0 opacity-40 mix-blend-screen">
        <div className="absolute -right-16 -top-24 h-40 w-40 rounded-full bg-accent/30 blur-3xl" />
        <div className="absolute -left-10 bottom-0 h-32 w-32 rounded-full bg-accent/20 blur-3xl" />
      </div>

      <div
        className={`relative flex h-full flex-col overflow-hidden ${
          isFeatured ? "md:flex-row" : ""
        }`}
      >
        <div
          className={`relative bg-linear-to-br from-neutral-200/80 via-neutral-300/80 to-neutral-100/80 ${
            isFeatured
              ? "h-64 md:h-full md:w-1/2 md:min-w-[260px]"
              : "h-3/5 w-full"
          }`}
        >
          {!imgError ? (
            <Image
              src={member.imagePath}
              alt={member.name}
              fill
              className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
              sizes={
                isFeatured
                  ? "(min-width: 1024px) 30vw, (min-width: 768px) 50vw, 100vw"
                  : "(min-width: 1024px) 20vw, (min-width: 768px) 33vw, 100vw"
              }
              onError={() => setImgError(true)}
            />
          ) : (
            <div
              className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-accent/15 via-accent/5 to-accent/10"
              aria-hidden
            >
              <span
                className="text-4xl font-semibold text-text-primary/40 font-sans md:text-5xl"
                style={{
                  fontFamily:
                    "var(--font-instrument-serif), Georgia, serif",
                }}
              >
                {initials}
              </span>
            </div>
          )}

          <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/40 via-black/10 to-transparent md:from-black/50" />
        </div>

        <div
          className={`relative flex flex-1 flex-col justify-end gap-2 p-5 ${
            isFeatured ? "md:justify-center md:p-8" : ""
          }`}
        >
          <div className="absolute inset-x-6 top-4 flex items-center justify-between text-xs font-medium text-text-secondary/70">
            <span className="inline-flex items-center gap-2 rounded-full bg-background/80 px-3 py-1 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.95)]" />
              {isFeatured ? "Dirección General" : "Equipo inmobiliario"}
            </span>
          </div>

          <div className="mt-10 space-y-1.5">
            <p className="text-lg md:text-xl font-semibold tracking-tight text-white md:text-text-primary">
              {member.name}
            </p>
            <p className="text-sm text-white/90 md:text-text-secondary">
              {member.position}
            </p>
            {isFeatured && (
              <p className="mt-2 max-w-md text-sm text-white/85 md:text-text-secondary">
                Lidera la visión y la estrategia que respaldan cada decisión
                sobre tu patrimonio.
              </p>
            )}
          </div>

          {isFeatured && (
            <div className="mt-4 flex items-center gap-3">
              <div className="h-px flex-1 rounded-full bg-linear-to-r from-accent via-accent/20 to-transparent" />
              <span className="text-[11px] uppercase tracking-[0.22em] text-accent">
                Bucaramanga
              </span>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

export function TeamSection({ members = defaultTeam }: { members?: TeamMember[] }) {
  const featured = members.find((m) => m.featured) ?? members[0];
  const rest = members.filter((m) => m.id !== featured.id);

  return (
    <section
      className="scroll-mt-24 pt-16 pb-20 md:pt-24 md:pb-28 px-6 md:px-12 -mx-6 md:-mx-12 bg-white"
    >
      <div className="max-w-6xl mx-auto">
        <header className="relative mb-12 md:mb-16 text-center">
          <div className="pointer-events-none absolute inset-x-0 -top-10 flex justify-center opacity-60">
            <div className="h-28 w-[60%] max-w-xl rounded-full bg-linear-to-r from-accent/10 via-accent/0 to-accent/10 blur-3xl" />
          </div>
          <p className="relative inline-flex items-center gap-2 rounded-full border border-accent/25 bg-background/70 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-accent backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_rgba(56,189,248,0.9)]" />
            El equipo
          </p>
          <h2 className="mt-4 text-balance text-3xl md:text-4xl font-semibold tracking-tight text-text-primary">
            Conoce a quienes hacen posible tu tranquilidad
          </h2>
          <p className="mt-3 text-balance text-base md:text-lg text-text-secondary max-w-xl mx-auto">
            Un equipo boutique de profesionales inmobiliarios que combina
            criterio técnico, sensibilidad humana y conocimiento profundo de
            Bucaramanga.
          </p>
        </header>

        <div className="relative">
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute inset-0 rounded-[2.25rem] border border-border/40 bg-background/60 shadow-[0_24px_80px_rgba(15,23,42,0.55)]" />
            <div className="absolute inset-x-10 top-5 h-px bg-linear-to-r from-transparent via-accent/30 to-transparent opacity-60" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6 p-4 md:p-6">
            <div className="md:col-span-2 lg:col-span-2 lg:row-span-2">
              <TeamCard member={featured} size="featured" />
            </div>
            {rest.map((member) => (
              <TeamCard key={member.id} member={member} size="default" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
